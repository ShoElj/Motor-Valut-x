import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db } from '../firebase/config';
import { doc, getDoc } from 'firebase/firestore';

import {
  AppBar, Toolbar, Typography, Container, Box, Button, Paper,
  CircularProgress, ThemeProvider, CssBaseline, Divider, Grid, Chip
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import darkTheme from '../theme';

const DetailRow = ({ label, value }) => (
  <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1, borderBottom: '1px solid #2a2a2a' }}>
    <Typography variant="body2" color="text.secondary">{label}</Typography>
    <Typography variant="body2" sx={{ fontWeight: 600 }}>{value || '—'}</Typography>
  </Box>
);

function CarDetail() {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const snap = await getDoc(doc(db, 'cars', id));
        if (snap.exists()) setCar(snap.data());
      } catch (err) {
        console.error('Error fetching car:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCar();
  }, [id]);

  const profit = car?.costPrice && car?.price ? car.price - car.costPrice : null;
  const soldDate = car?.soldAt?.toDate ? car.soldAt.toDate().toLocaleDateString() : null;

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
        <AppBar position="static" color="transparent" elevation={0} sx={{ borderBottom: '1px solid #333' }}>
          <Toolbar>
            <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
              Motor<span style={{ color: darkTheme.palette.primary.main }}>Vault</span>
            </Typography>
            <Button component={Link} to="/" color="inherit" startIcon={<ArrowBackIcon />}>Back</Button>
          </Toolbar>
        </AppBar>

        <main>
          <Container sx={{ py: 6 }} maxWidth="lg">
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center' }}><CircularProgress /></Box>
            ) : car ? (
              <Paper sx={{ p: { xs: 2, md: 4 }, borderRadius: 2, border: '1px solid #333' }}>
                <Grid container spacing={4}>
                  <Grid item xs={12} md={7}>
                    {car.imageUrl ? (
                      <Box component="img" src={car.imageUrl} alt={`${car.brand} ${car.model}`}
                        sx={{ width: '100%', height: 'auto', borderRadius: 2, maxHeight: 420, objectFit: 'cover' }} />
                    ) : (
                      <Box sx={{ width: '100%', height: 300, borderRadius: 2, bgcolor: '#2a2a2a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Typography color="text.secondary">No image available</Typography>
                      </Box>
                    )}
                  </Grid>

                  <Grid item xs={12} md={5}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <Typography component="h1" variant="h3">{car.brand} {car.model}</Typography>
                      <Chip label={car.status || 'For Sale'} color={car.status === 'Sold' ? 'secondary' : 'success'} />
                    </Box>
                    <Typography variant="h4" color="primary" sx={{ mb: 3, fontWeight: 700 }}>
                      ₦{car.price?.toLocaleString()}
                    </Typography>
                    <Divider sx={{ mb: 2 }} />

                    <DetailRow label="Year" value={car.year} />
                    <DetailRow label="Condition" value={car.condition} />
                    <DetailRow label="Transmission" value={car.transmission} />
                    <DetailRow label="Color" value={car.color} />
                    <DetailRow label="Mileage" value={car.mileage ? `${car.mileage.toLocaleString()} km` : null} />
                    {car.vin && <DetailRow label="VIN" value={car.vin} />}

                    {car.status === 'Sold' && (
                      <>
                        <Divider sx={{ my: 2 }} />
                        {car.buyerName && <DetailRow label="Buyer" value={car.buyerName} />}
                        {soldDate && <DetailRow label="Sold On" value={soldDate} />}
                        {profit !== null && (
                          <DetailRow label="Profit" value={`₦${profit.toLocaleString()}`} />
                        )}
                      </>
                    )}
                  </Grid>
                </Grid>
              </Paper>
            ) : (
              <Typography variant="h5" align="center" color="text.secondary">Car not found.</Typography>
            )}
          </Container>
        </main>
      </Box>
    </ThemeProvider>
  );
}

export default CarDetail;

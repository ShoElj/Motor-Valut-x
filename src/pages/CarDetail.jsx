import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db } from '../firebase/config';
import { collectionGroup, query, where, getDocs } from 'firebase/firestore';

import {
  AppBar, Toolbar, Typography, Container, Box, Button, Paper,
  CircularProgress, ThemeProvider, CssBaseline, Divider, Grid, Chip
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import darkTheme from '../theme';

const DetailRow = ({ label, value }) => (
  <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
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
        // Cars live at users/{uid}/cars/{carId} — use collectionGroup to find by ID
        const q = query(collectionGroup(db, 'cars'), where('__name__', '>=', ''), );
        // collectionGroup doesn't support filtering by document ID directly,
        // so we query all and find the matching doc
        const snapshot = await getDocs(collectionGroup(db, 'cars'));
        const match = snapshot.docs.find(d => d.id === id);
        if (match) setCar(match.data());
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
        <AppBar position="static" elevation={0}>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 800, letterSpacing: '-0.4px' }}>
              Motor<span style={{ color: darkTheme.palette.primary.main }}>Vault</span>
            </Typography>
            <Button component={Link} to="/" color="inherit" startIcon={<ArrowBackIcon />}>
              Back
            </Button>
          </Toolbar>
        </AppBar>

        <main>
          <Container sx={{ py: 6 }} maxWidth="lg">
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', pt: 8 }}>
                <CircularProgress />
              </Box>
            ) : car ? (
              <Paper sx={{ p: { xs: 2.5, md: 4 } }}>
                <Grid container spacing={4}>
                  <Grid item xs={12} md={7}>
                    {car.imageUrl ? (
                      <Box component="img" src={car.imageUrl} alt={`${car.brand} ${car.model}`}
                        sx={{ width: '100%', height: 'auto', borderRadius: 2, maxHeight: 420, objectFit: 'cover' }} />
                    ) : (
                      <Box sx={{
                        width: '100%', height: 300, borderRadius: 2,
                        bgcolor: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.06)',
                        display: 'flex', flexDirection: 'column',
                        alignItems: 'center', justifyContent: 'center', gap: 1,
                      }}>
                        <DirectionsCarIcon sx={{ fontSize: 40, color: '#333' }} />
                        <Typography variant="caption" color="text.secondary">No image available</Typography>
                      </Box>
                    )}
                  </Grid>

                  <Grid item xs={12} md={5}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5, flexWrap: 'wrap' }}>
                      <Typography component="h1" variant="h4" sx={{ fontWeight: 800 }}>
                        {car.brand} {car.model}
                      </Typography>
                      <Chip
                        label={car.status || 'For Sale'}
                        color={car.status === 'Sold' ? 'secondary' : 'success'}
                        size="small"
                      />
                    </Box>

                    <Typography variant="h4" color="primary" sx={{ mb: 3, fontWeight: 800 }}>
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
              <Box sx={{ textAlign: 'center', pt: 8 }}>
                <DirectionsCarIcon sx={{ fontSize: 48, color: '#333', mb: 2 }} />
                <Typography variant="h6" color="text.secondary">Car not found.</Typography>
                <Button component={Link} to="/" sx={{ mt: 2 }}>Back to Home</Button>
              </Box>
            )}
          </Container>
        </main>
      </Box>
    </ThemeProvider>
  );
}

export default CarDetail;

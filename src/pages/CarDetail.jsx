import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db } from '../firebase/config';
import { doc, getDoc } from 'firebase/firestore';

import {
  AppBar, Toolbar, Typography, Container, Box, Button, Paper,
  CircularProgress, ThemeProvider, CssBaseline, List, ListItem, ListItemText, Divider, Grid
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import darkTheme from '../theme';

function CarDetail() {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const docRef = doc(db, 'cars', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) setCar(docSnap.data());
      } catch (error) {
        console.error('Error fetching car:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCar();
  }, [id]);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
        <AppBar position="static" color="transparent" elevation={0} sx={{ borderBottom: '1px solid #333' }}>
          <Toolbar>
            <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
              Motor<span style={{ color: darkTheme.palette.primary.main }}>Vault</span>
            </Typography>
            <Button component={Link} to="/" color="inherit" startIcon={<ArrowBackIcon />}>
              Back to Inventory
            </Button>
          </Toolbar>
        </AppBar>
        <main>
          <Container sx={{ py: 8 }} maxWidth="lg">
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center' }}><CircularProgress /></Box>
            ) : car ? (
              <Paper sx={{ p: 2, borderRadius: 2, border: '1px solid #333' }}>
                <Grid container spacing={4}>
                  <Grid item xs={12} md={7}>
                    <Box
                      component="img" src={car.imageUrl} alt={`${car.brand} ${car.model}`}
                      sx={{ width: '100%', height: 'auto', borderRadius: 2 }}
                    />
                  </Grid>
                  <Grid item xs={12} md={5}>
                    <Typography component="h1" variant="h3" gutterBottom>
                      {car.brand} <span style={{ color: darkTheme.palette.text?.secondary }}>{car.model}</span>
                    </Typography>
                    <Typography variant="h4" color="primary" sx={{ mb: 4 }}>
                      ₦{car.price.toLocaleString()}
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <List>
                      <ListItem><ListItemText primary="Brand" secondary={car.brand} /></ListItem>
                      <ListItem><ListItemText primary="Model" secondary={car.model} /></ListItem>
                      <ListItem><ListItemText primary="Year" secondary={car.year} /></ListItem>
                      <ListItem><ListItemText primary="Condition" secondary={car.condition} /></ListItem>
                      <ListItem><ListItemText primary="Mileage" secondary={car.mileage ? `${car.mileage.toLocaleString()} km` : 'N/A'} /></ListItem>
                      <ListItem><ListItemText primary="Transmission" secondary={car.transmission} /></ListItem>
                      <ListItem><ListItemText primary="Color" secondary={car.color} /></ListItem>
                      {car.vin && <ListItem><ListItemText primary="VIN" secondary={car.vin} /></ListItem>}
                    </List>
                  </Grid>
                </Grid>
              </Paper>
            ) : (
              <Typography variant="h5" align="center" color="text.secondary">
                Sorry, car not found.
              </Typography>
            )}
          </Container>
        </main>
      </Box>
    </ThemeProvider>
  );
}

export default CarDetail;

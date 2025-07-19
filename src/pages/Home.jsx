import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../firebase/config';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';

// Import Material UI components
import {
    AppBar, Toolbar, Typography, Container, Grid, Paper, Box, Button, TextField,
    Card, CardContent, CardActions, CircularProgress, createTheme, ThemeProvider, CssBaseline
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#76ff03' },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h2: { fontWeight: 700 },
    h5: { fontWeight: 600 },
  },
});

function Home() {
  const [allCars, setAllCars] = useState([]); // All cars from Firestore
  const [filteredCars, setFilteredCars] = useState([]); // Cars to display after filtering
  const [loading, setLoading] = useState(true);

  // State for our new filters
  const [searchTerm, setSearchTerm] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  // Fetch all cars once from Firestore
  useEffect(() => {
    const q = query(collection(db, 'cars'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const carsData = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setAllCars(carsData);
      setFilteredCars(carsData); // Initially, show all cars
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // This effect runs whenever the filters (searchTerm, maxPrice) or the original car list change
  useEffect(() => {
    let tempCars = [...allCars];

    // Apply search term filter
    if (searchTerm) {
      tempCars = tempCars.filter(car =>
        car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.model.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply max price filter
    if (maxPrice) {
      tempCars = tempCars.filter(car => car.price <= Number(maxPrice));
    }

    setFilteredCars(tempCars);
  }, [searchTerm, maxPrice, allCars]);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
        <AppBar position="static" color="transparent" elevation={0} sx={{ borderBottom: '1px solid #333' }}>
          <Toolbar>
            <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
              Motor<span style={{ color: darkTheme.palette.primary.main }}>Vault</span>
            </Typography>
            <Button component={Link} to="/admin" color="inherit">Admin Login</Button>
          </Toolbar>
        </AppBar>

        <main>
          <Box sx={{ pt: 12, pb: 8, textAlign: 'center' }}>
            <Container maxWidth="md">
              <Typography component="h1" variant="h2" gutterBottom>
                Find Your Next Ride
              </Typography>
              <Typography variant="h5" color="text.secondary" paragraph>
                The premier destination for exclusive cars. Browse our curated inventory.
              </Typography>
            </Container>
          </Box>

          {/* --- NEW: SEARCH AND FILTER BAR --- */}
          <Container maxWidth="lg" sx={{ mb: 4 }}>
            <Paper sx={{ p: 2, borderRadius: 2, border: '1px solid #333' }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Search by Brand or Model"
                    variant="outlined"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                      startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Max Price (₦)"
                    variant="outlined"
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Container>

          {/* --- CARS GRID --- */}
          <Container sx={{ py: 4 }} maxWidth="lg">
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center' }}><CircularProgress /></Box>
            ) : filteredCars.length > 0 ? (
              <Grid container spacing={4}>
                {filteredCars.map((car) => (
                  <Grid item key={car.id} xs={12} sm={6} md={4}>
                    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', border: '1px solid #333', transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.03)' } }}>
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography gutterBottom variant="h5" component="h2">{car.brand}</Typography>
                        <Typography color="text.secondary">{car.model} - {car.year}</Typography>
                        <Typography variant="h4" color="primary" sx={{ mt: 2 }}>₦{car.price.toLocaleString()}</Typography>
                      </CardContent>
                      <CardActions>
                        <Button component={Link} to={`/car/${car.id}`} size="small" variant="contained">
                          View Details
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Typography variant="h6" align="center" color="text.secondary" sx={{ mt: 4 }}>
                No cars match your criteria. Try adjusting your search or filters.
              </Typography>
            )}
          </Container>
        </main>
      </Box>
    </ThemeProvider>
  );
}

export default Home;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase/config';
import { signOut } from 'firebase/auth';
import { collection, addDoc, serverTimestamp, query, onSnapshot, orderBy, deleteDoc, doc, updateDoc } from 'firebase/firestore';

// Import Material UI components and Icons
import {
    AppBar, Toolbar, Typography, Button, Container, Grid, Paper, Box, TextField, Alert,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress,
    createTheme, ThemeProvider, CssBaseline, IconButton, Dialog, DialogActions, DialogContent,
    DialogContentText, DialogTitle, Select, MenuItem, FormControl, InputLabel, Chip
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#76ff03' },
    secondary: { main: '#f50057' },
    background: { default: '#121212', paper: '#1e1e1e' },
    success: { main: '#69f0ae' },
    warning: { main: '#ffab40' },
  },
  typography: { fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif', h5: { fontWeight: 600 } },
});

function Dashboard() {
  const navigate = useNavigate();

  // --- FORM STATE ---
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [status, setStatus] = useState('For Sale');
  const [condition, setCondition] = useState('Tokunbo');
  const [mileage, setMileage] = useState('');
  const [vin, setVin] = useState('');
  const [transmission, setTransmission] = useState('Automatic');
  const [color, setColor] = useState('');

  // --- UI & DATA STATE ---
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [cars, setCars] = useState([]);
  const [carsLoading, setCarsLoading] = useState(true);

  // --- EDIT & DELETE STATE ---
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentCar, setCurrentCar] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [carToDelete, setCarToDelete] = useState(null);

  useEffect(() => {
    const q = query(collection(db, 'cars'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setCars(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
      setCarsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => { await signOut(auth); navigate('/'); };

  const resetForm = () => {
    setBrand(''); setModel(''); setYear(''); setPrice(''); setImageUrl('');
    setStatus('For Sale'); setCondition('Tokunbo'); setMileage(''); setVin('');
    setTransmission('Automatic'); setColor('');
  };

  const handleAddCar = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, 'cars'), {
        brand, model, imageUrl, status, condition, vin, transmission, color,
        year: Number(year), price: Number(price), mileage: Number(mileage),
        createdAt: serverTimestamp(), userId: auth.currentUser.uid
      });
      setMessage({ type: 'success', text: 'Car added successfully!' });
      resetForm();
    } catch (error) {
      setMessage({ type: 'error', text: `Error: ${error.message}` });
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (car) => {
    setCurrentCar(car);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setCurrentCar(null);
  };

  const handleUpdateCar = async (e) => {
    e.preventDefault();
    if (!currentCar) return;
    setLoading(true);
    const carRef = doc(db, 'cars', currentCar.id);
    try {
      const updatedData = {
        brand: currentCar.brand, model: currentCar.model, imageUrl: currentCar.imageUrl,
        status: currentCar.status, condition: currentCar.condition, vin: currentCar.vin,
        transmission: currentCar.transmission, color: currentCar.color,
        year: Number(currentCar.year), price: Number(currentCar.price), mileage: Number(currentCar.mileage),
      };
      await updateDoc(carRef, updatedData);
      setMessage({ type: 'success', text: 'Car updated successfully!' });
    } catch (error) {
      setMessage({ type: 'error', text: `Error updating car: ${error.message}` });
    } finally {
      setLoading(false);
      handleCloseEditModal();
    }
  };

  const handleDeleteClick = (car) => { setCarToDelete(car); setOpenDeleteDialog(true); };
  const handleCloseDeleteDialog = () => { setCarToDelete(null); setOpenDeleteDialog(false); };
  const handleDeleteConfirm = async () => {
    if (!carToDelete) return;
    try {
      await deleteDoc(doc(db, 'cars', carToDelete.id));
      setMessage({ type: 'success', text: 'Car deleted successfully.' });
    } catch (error) {
      setMessage({ type: 'error', text: `Error deleting car: ${error.message}` });
    }
    handleCloseDeleteDialog();
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        {/* Sidebar */}
        <Box component="nav" sx={{ width: 240, flexShrink: 0, bgcolor: '#1e1e1e', minHeight: '100vh', borderRight: '1px solid #333' }}>
          <Toolbar sx={{ display: 'flex', justifyContent: 'center', py: 2, borderBottom: '1px solid #333' }}><Typography variant="h5" sx={{ fontWeight: 'bold' }}>Motor<span style={{ color: darkTheme.palette.primary.main }}>Vault</span></Typography></Toolbar>
          <Box sx={{ p: 2 }}><Button fullWidth startIcon={<DashboardIcon />} sx={{ justifyContent: 'flex-start', mb: 1, color: 'primary.main', bgcolor: 'rgba(118, 255, 3, 0.1)' }}>Dashboard</Button></Box>
        </Box>

        {/* Main Content */}
        <Box component="main" sx={{ flexGrow: 1, bgcolor: '#121212', p: 3, height: '100vh', overflow: 'auto' }}>
          <AppBar position="static" color="transparent" elevation={0}><Toolbar><Typography variant="h6" sx={{ flexGrow: 1 }}>Welcome, Admin</Typography><Button color="inherit" onClick={handleLogout} startIcon={<LogoutIcon />}>Logout</Button></Toolbar></AppBar>
          <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={4}>
              {/* Add Car Form */}
              <Grid item xs={12} lg={5}>
                <Paper sx={{ p: 3, borderRadius: 2, border: '1px solid #333' }}>
                  <Typography component="h2" variant="h5" color="primary" gutterBottom>Add New Car</Typography>
                  <Box component="form" onSubmit={handleAddCar} sx={{ mt: 2 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={6}><TextField fullWidth label="Brand" value={brand} onChange={e => setBrand(e.target.value)} required /></Grid>
                      <Grid item xs={6}><TextField fullWidth label="Model" value={model} onChange={e => setModel(e.target.value)} required /></Grid>
                      <Grid item xs={6}><TextField fullWidth label="Year" type="number" value={year} onChange={e => setYear(e.target.value)} required /></Grid>
                      <Grid item xs={6}><TextField fullWidth label="Price (₦)" type="number" value={price} onChange={e => setPrice(e.target.value)} required /></Grid>
                      <Grid item xs={6}><TextField fullWidth label="Mileage (km)" type="number" value={mileage} onChange={e => setMileage(e.target.value)} /></Grid>
                      <Grid item xs={6}><TextField fullWidth label="Color" value={color} onChange={e => setColor(e.target.value)} /></Grid>
                      <Grid item xs={12}><TextField fullWidth label="VIN" value={vin} onChange={e => setVin(e.target.value)} /></Grid>
                      <Grid item xs={12}><TextField fullWidth label="Image URL" value={imageUrl} onChange={e => setImageUrl(e.target.value)} required /></Grid>
                      <Grid item xs={6}><FormControl fullWidth><InputLabel>Condition</InputLabel><Select value={condition} label="Condition" onChange={e => setCondition(e.target.value)}><MenuItem value="Brand New">Brand New</MenuItem><MenuItem value="Tokunbo">Tokunbo</MenuItem><MenuItem value="Nigerian Used">Nigerian Used</MenuItem></Select></FormControl></Grid>
                      <Grid item xs={6}><FormControl fullWidth><InputLabel>Transmission</InputLabel><Select value={transmission} label="Transmission" onChange={e => setTransmission(e.target.value)}><MenuItem value="Automatic">Automatic</MenuItem><MenuItem value="Manual">Manual</MenuItem></Select></FormControl></Grid>
                      <Grid item xs={12}><FormControl fullWidth><InputLabel>Status</InputLabel><Select value={status} label="Status" onChange={e => setStatus(e.target.value)}><MenuItem value="For Sale">For Sale</MenuItem><MenuItem value="Sold">Sold</MenuItem></Select></FormControl></Grid>
                    </Grid>
                    {message.text && <Alert severity={message.type} sx={{ mt: 2 }}>{message.text}</Alert>}
                    <Button type="submit" variant="contained" disabled={loading} fullWidth sx={{ mt: 3, py: 1.5 }}>{loading ? <CircularProgress size={24} /> : 'Add Car'}</Button>
                  </Box>
                </Paper>
              </Grid>

              {/* Current Inventory Table */}
              <Grid item xs={12} lg={7}>
                <Paper sx={{ p: 2, borderRadius: 2, border: '1px solid #333' }}>
                  <Typography component="h2" variant="h5" color="primary" gutterBottom>Current Inventory</Typography>
                  <TableContainer>
                    {carsLoading ? <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}><CircularProgress /></Box> :
                    <Table size="small">
                      <TableHead><TableRow><TableCell>Car</TableCell><TableCell>Condition</TableCell><TableCell>Price</TableCell><TableCell>Status</TableCell><TableCell align="right">Actions</TableCell></TableRow></TableHead>
                      <TableBody>
                        {cars.map((car) => (
                          <TableRow key={car.id} hover>
                            <TableCell><Typography variant="body2" sx={{ fontWeight: 'bold' }}>{car.brand} {car.model}</Typography><Typography variant="caption" color="text.secondary">{car.year}</Typography></TableCell>
                            <TableCell>{car.condition}</TableCell>
                            <TableCell>₦{car.price?.toLocaleString()}</TableCell>
                            <TableCell><Chip label={car.status} color={car.status === 'Sold' ? 'secondary' : 'success'} size="small" /></TableCell>
                            <TableCell align="right"><IconButton onClick={() => handleEditClick(car)} size="small"><EditIcon fontSize="small" /></IconButton><IconButton onClick={() => handleDeleteClick(car)} color="secondary" size="small"><DeleteIcon fontSize="small" /></IconButton></TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>}
                  </TableContainer>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>

      {/* Edit Car Modal */}
      <Dialog open={isEditModalOpen} onClose={handleCloseEditModal}>
        <DialogTitle>Edit Car Details</DialogTitle>
        <Box component="form" onSubmit={handleUpdateCar}>
          <DialogContent>
            <TextField fullWidth label="Brand" value={currentCar?.brand || ''} onChange={e => setCurrentCar({...currentCar, brand: e.target.value})} required margin="normal" />
            <TextField fullWidth label="Model" value={currentCar?.model || ''} onChange={e => setCurrentCar({...currentCar, model: e.target.value})} required margin="normal" />
            <TextField fullWidth label="Year" type="number" value={currentCar?.year || ''} onChange={e => setCurrentCar({...currentCar, year: e.target.value})} required margin="normal" />
            <TextField fullWidth label="Price (₦)" type="number" value={currentCar?.price || ''} onChange={e => setCurrentCar({...currentCar, price: e.target.value})} required margin="normal" />
            <TextField fullWidth label="Mileage (km)" type="number" value={currentCar?.mileage || ''} onChange={e => setCurrentCar({...currentCar, mileage: e.target.value})} margin="normal" />
            <TextField fullWidth label="Color" value={currentCar?.color || ''} onChange={e => setCurrentCar({...currentCar, color: e.target.value})} margin="normal" />
            <TextField fullWidth label="VIN" value={currentCar?.vin || ''} onChange={e => setCurrentCar({...currentCar, vin: e.target.value})} margin="normal" />
            <TextField fullWidth label="Image URL" value={currentCar?.imageUrl || ''} onChange={e => setCurrentCar({...currentCar, imageUrl: e.target.value})} required margin="normal" />
            <FormControl fullWidth margin="normal"><InputLabel>Condition</InputLabel><Select value={currentCar?.condition || 'Tokunbo'} label="Condition" onChange={e => setCurrentCar({...currentCar, condition: e.target.value})}><MenuItem value="Brand New">Brand New</MenuItem><MenuItem value="Tokunbo">Tokunbo</MenuItem><MenuItem value="Nigerian Used">Nigerian Used</MenuItem></Select></FormControl>
            <FormControl fullWidth margin="normal"><InputLabel>Transmission</InputLabel><Select value={currentCar?.transmission || 'Automatic'} label="Transmission" onChange={e => setCurrentCar({...currentCar, transmission: e.target.value})}><MenuItem value="Automatic">Automatic</MenuItem><MenuItem value="Manual">Manual</MenuItem></Select></FormControl>
            <FormControl fullWidth margin="normal"><InputLabel>Status</InputLabel><Select value={currentCar?.status || 'For Sale'} label="Status" onChange={e => setCurrentCar({...currentCar, status: e.target.value})}><MenuItem value="For Sale">For Sale</MenuItem><MenuItem value="Sold">Sold</MenuItem></Select></FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseEditModal}>Cancel</Button>
            <Button type="submit" variant="contained" disabled={loading}>{loading ? 'Saving...' : 'Save Changes'}</Button>
          </DialogActions>
        </Box>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}><DialogTitle>Confirm Deletion</DialogTitle><DialogContent><DialogContentText>Are you sure you want to permanently delete the {carToDelete?.brand} {carToDelete?.model}?</DialogContentText></DialogContent><DialogActions><Button onClick={handleCloseDeleteDialog}>Cancel</Button><Button onClick={handleDeleteConfirm} color="secondary" autoFocus>Delete</Button></DialogActions></Dialog>
    </ThemeProvider>
  );
}

export default Dashboard;
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase/config';
import { signOut } from 'firebase/auth';
import { collection, addDoc, serverTimestamp, query, onSnapshot, orderBy, deleteDoc, doc, updateDoc } from 'firebase/firestore';

import {
  AppBar, Toolbar, Typography, Button, Container, Grid, Paper, Box, TextField, Alert,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress,
  ThemeProvider, CssBaseline, IconButton, Dialog, DialogActions, DialogContent,
  DialogContentText, DialogTitle, Select, MenuItem, FormControl, InputLabel, Chip,
  Drawer, useMediaQuery, Divider
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MenuIcon from '@mui/icons-material/Menu';
import CheckIcon from '@mui/icons-material/Check';
import darkTheme from '../theme';

const drawerWidth = 240;

const INITIAL_FORM = {
  brand: '', model: '', year: '', price: '', imageUrl: '',
  status: 'For Sale', condition: 'Tokunbo', mileage: '', vin: '',
  transmission: 'Automatic', color: '',
};

function Dashboard() {
  const navigate = useNavigate();
  const isMobile = useMediaQuery(darkTheme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [form, setForm] = useState(INITIAL_FORM);
  const [addLoading, setAddLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [cars, setCars] = useState([]);
  const [carsLoading, setCarsLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentCar, setCurrentCar] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [carToDelete, setCarToDelete] = useState(null);

  const showMessage = useCallback((type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 4000);
  }, []);

  useEffect(() => {
    const q = query(collection(db, 'cars'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setCars(snapshot.docs.map(d => ({ ...d.data(), id: d.id })));
      setCarsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => { await signOut(auth); navigate('/'); };

  const handleAddCar = async (e) => {
    e.preventDefault();
    setAddLoading(true);
    try {
      await addDoc(collection(db, 'cars'), {
        ...form,
        year: Number(form.year),
        price: Number(form.price),
        mileage: Number(form.mileage),
        createdAt: serverTimestamp(),
        userId: auth.currentUser.uid,
      });
      showMessage('success', 'Car added successfully!');
      setForm(INITIAL_FORM);
    } catch (error) {
      showMessage('error', `Error: ${error.message}`);
    } finally {
      setAddLoading(false);
    }
  };

  const handleUpdateCar = async (e) => {
    e.preventDefault();
    if (!currentCar) return;
    setActionLoading(true);
    try {
      await updateDoc(doc(db, 'cars', currentCar.id), {
        brand: currentCar.brand, model: currentCar.model, imageUrl: currentCar.imageUrl,
        status: currentCar.status, condition: currentCar.condition, vin: currentCar.vin,
        transmission: currentCar.transmission, color: currentCar.color,
        year: Number(currentCar.year), price: Number(currentCar.price), mileage: Number(currentCar.mileage),
      });
      showMessage('success', 'Car updated successfully!');
    } catch (error) {
      showMessage('error', `Error updating car: ${error.message}`);
    } finally {
      setActionLoading(false);
      setIsEditModalOpen(false);
      setCurrentCar(null);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!carToDelete) return;
    setActionLoading(true);
    try {
      await deleteDoc(doc(db, 'cars', carToDelete.id));
      showMessage('success', 'Car deleted successfully.');
    } catch (error) {
      showMessage('error', `Error deleting car: ${error.message}`);
    } finally {
      setActionLoading(false);
      setCarToDelete(null);
      setOpenDeleteDialog(false);
    }
  };

  const markAsSold = async (id) => {
    setActionLoading(true);
    try {
      await updateDoc(doc(db, 'cars', id), { status: 'Sold' });
      showMessage('success', 'Car marked as sold.');
    } catch (error) {
      showMessage('error', `Error marking sold: ${error.message}`);
    } finally {
      setActionLoading(false);
    }
  };

  const drawerContent = (
    <div>
      <Toolbar sx={{ display: 'flex', justifyContent: 'center', py: 2, borderBottom: '1px solid #333' }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          Motor<span style={{ color: darkTheme.palette.primary.main }}>Vault</span>
        </Typography>
      </Toolbar>
      <Box sx={{ p: 2 }}>
        <Button fullWidth startIcon={<DashboardIcon />} sx={{ justifyContent: 'flex-start', mb: 1, color: 'primary.main', bgcolor: 'rgba(118, 255, 3, 0.1)' }}>
          Dashboard
        </Button>
      </Box>
    </div>
  );

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, bgcolor: '#1e1e1e' }}>
          <Toolbar>
            {isMobile && (
              <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={() => setMobileOpen(!mobileOpen)} sx={{ mr: 2 }}>
                <MenuIcon />
              </IconButton>
            )}
            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
              {isMobile ? 'MotorVault' : 'Welcome, Admin'}
            </Typography>
            <Button color="inherit" onClick={handleLogout} startIcon={<LogoutIcon />}>Logout</Button>
          </Toolbar>
        </AppBar>

        <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
          {isMobile ? (
            <Drawer variant="temporary" open={mobileOpen} onClose={() => setMobileOpen(false)} ModalProps={{ keepMounted: true }}
              sx={{ '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, bgcolor: '#1e1e1e' } }}>
              {drawerContent}
            </Drawer>
          ) : (
            <Drawer variant="permanent" sx={{ '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, bgcolor: '#1e1e1e' } }}>
              {drawerContent}
            </Drawer>
          )}
        </Box>

        <Box component="main" sx={{ flexGrow: 1, p: { xs: 2, sm: 3 }, width: { md: `calc(100% - ${drawerWidth}px)` } }}>
          <Toolbar />
          <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            {message.text && (
              <Alert severity={message.type} sx={{ mb: 2 }} onClose={() => setMessage({ type: '', text: '' })}>
                {message.text}
              </Alert>
            )}
            <Grid container spacing={4}>
              {/* Add Car Form */}
              <Grid item xs={12} md={5}>
                <Paper sx={{ p: 3, borderRadius: 2, border: '1px solid #333' }}>
                  <Typography component="h2" variant="h5" color="primary" gutterBottom>Add New Car</Typography>
                  <Box component="form" onSubmit={handleAddCar} sx={{ mt: 2 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}><TextField fullWidth label="Brand" value={form.brand} onChange={e => setForm(f => ({ ...f, brand: e.target.value }))} required /></Grid>
                      <Grid item xs={12} sm={6}><TextField fullWidth label="Model" value={form.model} onChange={e => setForm(f => ({ ...f, model: e.target.value }))} required /></Grid>
                      <Grid item xs={12} sm={6}><TextField fullWidth label="Year" type="number" value={form.year} onChange={e => setForm(f => ({ ...f, year: e.target.value }))} required /></Grid>
                      <Grid item xs={12} sm={6}><TextField fullWidth label="Price (₦)" type="number" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} required /></Grid>
                      <Grid item xs={12} sm={6}><TextField fullWidth label="Mileage (km)" type="number" value={form.mileage} onChange={e => setForm(f => ({ ...f, mileage: e.target.value }))} /></Grid>
                      <Grid item xs={12} sm={6}><TextField fullWidth label="Color" value={form.color} onChange={e => setForm(f => ({ ...f, color: e.target.value }))} /></Grid>
                      <Grid item xs={12}><TextField fullWidth label="VIN" value={form.vin} onChange={e => setForm(f => ({ ...f, vin: e.target.value }))} /></Grid>
                      <Grid item xs={12}><TextField fullWidth label="Image URL" value={form.imageUrl} onChange={e => setForm(f => ({ ...f, imageUrl: e.target.value }))} required /></Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth><InputLabel>Condition</InputLabel>
                          <Select value={form.condition} label="Condition" onChange={e => setForm(f => ({ ...f, condition: e.target.value }))}>
                            <MenuItem value="Brand New">Brand New</MenuItem>
                            <MenuItem value="Tokunbo">Tokunbo</MenuItem>
                            <MenuItem value="Nigerian Used">Nigerian Used</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth><InputLabel>Transmission</InputLabel>
                          <Select value={form.transmission} label="Transmission" onChange={e => setForm(f => ({ ...f, transmission: e.target.value }))}>
                            <MenuItem value="Automatic">Automatic</MenuItem>
                            <MenuItem value="Manual">Manual</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                        <FormControl fullWidth><InputLabel>Status</InputLabel>
                          <Select value={form.status} label="Status" onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
                            <MenuItem value="For Sale">For Sale</MenuItem>
                            <MenuItem value="Sold">Sold</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                    <Button type="submit" variant="contained" disabled={addLoading} fullWidth sx={{ mt: 3, py: 1.5 }}>
                      {addLoading ? <CircularProgress size={24} /> : 'Add Car'}
                    </Button>
                  </Box>
                </Paper>
              </Grid>

              {/* Inventory List */}
              <Grid item xs={12} md={7}>
                <Paper sx={{ p: 2, borderRadius: 2, border: '1px solid #333' }}>
                  <Typography component="h2" variant="h5" color="primary" gutterBottom>Current Inventory</Typography>
                  {carsLoading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}><CircularProgress /></Box>
                  ) : isMobile ? (
                    <Box>
                      {cars.map((car) => (
                        <Paper key={car.id} sx={{ p: 2, mb: 2, border: '1px solid #333' }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{car.brand} {car.model}</Typography>
                            <Chip label={car.status || 'For Sale'} color={car.status === 'Sold' ? 'secondary' : 'success'} size="small" />
                          </Box>
                          <Typography variant="body2" color="text.secondary">{car.year} • {car.condition}</Typography>
                          <Typography variant="h6" sx={{ my: 1 }}>
                            {car.status === 'Sold'
                              ? <span style={{ textDecoration: 'line-through', color: 'gray' }}>₦{car.price?.toLocaleString()}</span>
                              : `₦${car.price?.toLocaleString()}`}
                          </Typography>
                          <Divider sx={{ my: 1 }} />
                          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 1 }}>
                            {car.status === 'For Sale' && (
                              <Button onClick={() => markAsSold(car.id)} size="small" variant="contained" color="success" startIcon={<CheckIcon />} disabled={actionLoading}>
                                Mark as Sold
                              </Button>
                            )}
                            <Button onClick={() => { setCurrentCar(car); setIsEditModalOpen(true); }} size="small" startIcon={<EditIcon />}>Edit</Button>
                            <Button onClick={() => { setCarToDelete(car); setOpenDeleteDialog(true); }} color="secondary" size="small" startIcon={<DeleteIcon />}>Delete</Button>
                          </Box>
                        </Paper>
                      ))}
                    </Box>
                  ) : (
                    <TableContainer>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell>Car</TableCell>
                            <TableCell>Condition</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell align="right">Actions</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {cars.map((car) => (
                            <TableRow key={car.id} hover>
                              <TableCell>
                                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{car.brand} {car.model}</Typography>
                                <Typography variant="caption" color="text.secondary">{car.year}</Typography>
                              </TableCell>
                              <TableCell>{car.condition}</TableCell>
                              <TableCell>
                                {car.status === 'Sold'
                                  ? <span style={{ textDecoration: 'line-through', color: 'gray' }}>₦{car.price?.toLocaleString()}</span>
                                  : `₦${car.price?.toLocaleString()}`}
                              </TableCell>
                              <TableCell>
                                <Chip label={car.status || 'For Sale'} color={car.status === 'Sold' ? 'secondary' : 'success'} size="small" />
                              </TableCell>
                              <TableCell align="right">
                                {car.status === 'For Sale' && (
                                  <IconButton onClick={() => markAsSold(car.id)} size="small" color="success" sx={{ mr: 1 }} disabled={actionLoading}>
                                    <CheckIcon fontSize="small" />
                                  </IconButton>
                                )}
                                <IconButton onClick={() => { setCurrentCar(car); setIsEditModalOpen(true); }} size="small">
                                  <EditIcon fontSize="small" />
                                </IconButton>
                                <IconButton onClick={() => { setCarToDelete(car); setOpenDeleteDialog(true); }} color="secondary" size="small">
                                  <DeleteIcon fontSize="small" />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  )}
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>

      {/* Edit Modal */}
      <Dialog open={isEditModalOpen} onClose={() => { setIsEditModalOpen(false); setCurrentCar(null); }} fullScreen={isMobile}>
        <DialogTitle>Edit Car Details</DialogTitle>
        <Box component="form" onSubmit={handleUpdateCar}>
          <DialogContent>
            <TextField fullWidth label="Brand" value={currentCar?.brand || ''} onChange={e => setCurrentCar(c => ({ ...c, brand: e.target.value }))} required margin="normal" />
            <TextField fullWidth label="Model" value={currentCar?.model || ''} onChange={e => setCurrentCar(c => ({ ...c, model: e.target.value }))} required margin="normal" />
            <TextField fullWidth label="Year" type="number" value={currentCar?.year || ''} onChange={e => setCurrentCar(c => ({ ...c, year: e.target.value }))} required margin="normal" />
            <TextField fullWidth label="Price (₦)" type="number" value={currentCar?.price || ''} onChange={e => setCurrentCar(c => ({ ...c, price: e.target.value }))} required margin="normal" />
            <TextField fullWidth label="Mileage (km)" type="number" value={currentCar?.mileage || ''} onChange={e => setCurrentCar(c => ({ ...c, mileage: e.target.value }))} margin="normal" />
            <TextField fullWidth label="Color" value={currentCar?.color || ''} onChange={e => setCurrentCar(c => ({ ...c, color: e.target.value }))} margin="normal" />
            <TextField fullWidth label="VIN" value={currentCar?.vin || ''} onChange={e => setCurrentCar(c => ({ ...c, vin: e.target.value }))} margin="normal" />
            <TextField fullWidth label="Image URL" value={currentCar?.imageUrl || ''} onChange={e => setCurrentCar(c => ({ ...c, imageUrl: e.target.value }))} required margin="normal" />
            <FormControl fullWidth margin="normal"><InputLabel>Condition</InputLabel>
              <Select value={currentCar?.condition || 'Tokunbo'} label="Condition" onChange={e => setCurrentCar(c => ({ ...c, condition: e.target.value }))}>
                <MenuItem value="Brand New">Brand New</MenuItem>
                <MenuItem value="Tokunbo">Tokunbo</MenuItem>
                <MenuItem value="Nigerian Used">Nigerian Used</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal"><InputLabel>Transmission</InputLabel>
              <Select value={currentCar?.transmission || 'Automatic'} label="Transmission" onChange={e => setCurrentCar(c => ({ ...c, transmission: e.target.value }))}>
                <MenuItem value="Automatic">Automatic</MenuItem>
                <MenuItem value="Manual">Manual</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal"><InputLabel>Status</InputLabel>
              <Select value={currentCar?.status || 'For Sale'} label="Status" onChange={e => setCurrentCar(c => ({ ...c, status: e.target.value }))}>
                <MenuItem value="For Sale">For Sale</MenuItem>
                <MenuItem value="Sold">Sold</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => { setIsEditModalOpen(false); setCurrentCar(null); }}>Cancel</Button>
            <Button type="submit" variant="contained" disabled={actionLoading}>
              {actionLoading ? 'Saving...' : 'Save Changes'}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={openDeleteDialog} onClose={() => { setOpenDeleteDialog(false); setCarToDelete(null); }}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to permanently delete the {carToDelete?.brand} {carToDelete?.model}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { setOpenDeleteDialog(false); setCarToDelete(null); }}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="secondary" autoFocus disabled={actionLoading}>Delete</Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}

export default Dashboard;

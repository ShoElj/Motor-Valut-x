import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/authService';
import { addCar, updateCar, deleteCar, markAsSold } from '../services/carService';
import { deleteCarImage } from '../services/uploadService';
import { useCars } from '../hooks/useCars';
import { useAuth } from '../hooks/useAuth';
import StatsCards from '../components/dashboard/StatsCards';
import Filters from '../components/dashboard/Filters';
import ImageUpload from '../components/dashboard/ImageUpload';
import SalesHistory from '../components/dashboard/SalesHistory';
import RevenueChart from '../components/dashboard/RevenueChart';
import AgedStock from '../components/dashboard/AgedStock';
import ShareListing from '../components/dashboard/ShareListing';
import { exportToCSV } from '../utils/exportCSV';

import {
  AppBar, Toolbar, Typography, Button, Container, Grid, Paper, Box, TextField, Alert,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress,
  ThemeProvider, CssBaseline, IconButton, Dialog, DialogActions, DialogContent,
  DialogContentText, DialogTitle, Select, MenuItem, FormControl, InputLabel, Chip,
  Drawer, useMediaQuery, Tooltip, Skeleton
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MenuIcon from '@mui/icons-material/Menu';
import CheckIcon from '@mui/icons-material/Check';
import AddIcon from '@mui/icons-material/Add';
import DownloadIcon from '@mui/icons-material/Download';
import BarChartIcon from '@mui/icons-material/BarChart';
import HistoryIcon from '@mui/icons-material/History';
import darkTheme from '../theme';

const drawerWidth = 240;

const INITIAL_FORM = {
  brand: '', model: '', year: '', price: '', costPrice: '',
  imageUrl: '', imagePath: '',
  status: 'For Sale', condition: 'Tokunbo', mileage: '', vin: '',
  transmission: 'Automatic', color: '',
};

const daysInStock = (createdAt) => {
  if (!createdAt?.toDate) return null;
  return Math.floor((Date.now() - createdAt.toDate().getTime()) / 86400000);
};

const agingColor = (days) => {
  if (days > 90) return '#f50057';
  if (days > 60) return '#ffab40';
  if (days > 30) return '#fff176';
  return 'inherit';
};

function FieldRow({ children }) {
  return <Grid container spacing={2}>{children}</Grid>;
}

function SectionHeader({ title, right, subtle = false, compact = false }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: compact ? 2 : 2.5, flexWrap: 'wrap' }}>
      <Box sx={{
        width: 3,
        height: 18,
        borderRadius: 2,
        bgcolor: subtle ? 'rgba(118,255,3,0.8)' : 'primary.main',
      }} />
      <Typography variant="h6" sx={{ lineHeight: 1.1 }}>{title}</Typography>
      {right && <Box sx={{ ml: 'auto', display: 'flex', gap: 1, alignItems: 'center' }}>{right}</Box>}
    </Box>
  );
}

function CarFormFields({ data, onChange, isEdit = false }) {
  const set = (key) => (e) => onChange(prev => ({ ...prev, [key]: e.target.value }));
  return (
    <Grid container spacing={2.25}>
      <Grid item xs={12}>
        <ImageUpload
          value={{ imageUrl: data.imageUrl || '', imagePath: data.imagePath || '' }}
          onChange={({ imageUrl, imagePath }) => onChange(prev => ({ ...prev, imageUrl, imagePath }))}
          size="100%"
        />
      </Grid>
      <Grid item xs={12} sm={6}><TextField fullWidth label="Brand" value={data.brand || ''} onChange={set('brand')} required /></Grid>
      <Grid item xs={12} sm={6}><TextField fullWidth label="Model" value={data.model || ''} onChange={set('model')} required /></Grid>
      <Grid item xs={12} sm={6}><TextField fullWidth label="Year" type="number" value={data.year || ''} onChange={set('year')} required /></Grid>
      <Grid item xs={12} sm={6}><TextField fullWidth label="Color" value={data.color || ''} onChange={set('color')} /></Grid>
      <Grid item xs={12} sm={6}><TextField fullWidth label="Price (₦)" type="number" value={data.price || ''} onChange={set('price')} required /></Grid>
      <Grid item xs={12} sm={6}><TextField fullWidth label="Cost Price (₦)" type="number" value={data.costPrice || ''} onChange={set('costPrice')} /></Grid>
      <Grid item xs={12} sm={6}><TextField fullWidth label="Mileage (km)" type="number" value={data.mileage || ''} onChange={set('mileage')} /></Grid>
      <Grid item xs={12} sm={6}><TextField fullWidth label="VIN" value={data.vin || ''} onChange={set('vin')} /></Grid>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel>Condition</InputLabel>
          <Select value={data.condition || 'Tokunbo'} label="Condition" onChange={set('condition')}>
            <MenuItem value="Brand New">Brand New</MenuItem>
            <MenuItem value="Tokunbo">Tokunbo</MenuItem>
            <MenuItem value="Nigerian Used">Nigerian Used</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel>Transmission</InputLabel>
          <Select value={data.transmission || 'Automatic'} label="Transmission" onChange={set('transmission')}>
            <MenuItem value="Automatic">Automatic</MenuItem>
            <MenuItem value="Manual">Manual</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel>Status</InputLabel>
          <Select value={data.status || 'For Sale'} label="Status" onChange={set('status')}>
            <MenuItem value="For Sale">For Sale</MenuItem>
            <MenuItem value="Sold">Sold</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      {(isEdit || data.status === 'Sold') && (
        <Grid item xs={12}>
          <TextField fullWidth label="Buyer Name" value={data.buyerName || ''} onChange={set('buyerName')} />
        </Grid>
      )}
    </Grid>
  );
}

function TableSkeleton() {
  return Array.from({ length: 5 }).map((_, i) => (
    <TableRow key={i}>
      <TableCell><Skeleton variant="text" width="80%" /><Skeleton variant="text" width="40%" /></TableCell>
      <TableCell><Skeleton variant="text" width={60} /></TableCell>
      <TableCell><Skeleton variant="text" width={80} /></TableCell>
      <TableCell><Skeleton variant="text" width={30} /></TableCell>
      <TableCell><Skeleton variant="rounded" width={60} height={22} /></TableCell>
      <TableCell align="right"><Skeleton variant="rounded" width={80} height={28} /></TableCell>
    </TableRow>
  ));
}

function MobileCardSkeleton() {
  return Array.from({ length: 3 }).map((_, i) => (
    <Paper key={i} sx={{ p: 2, mb: 2 }}>
      <Skeleton variant="text" width="60%" height={28} />
      <Skeleton variant="text" width="40%" />
      <Skeleton variant="text" width="50%" height={32} sx={{ mt: 1 }} />
      <Box sx={{ display: 'flex', gap: 1, mt: 1, justifyContent: 'flex-end' }}>
        <Skeleton variant="rounded" width={70} height={30} />
        <Skeleton variant="rounded" width={50} height={30} />
      </Box>
    </Paper>
  ));
}

function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const uid = user?.uid;
  const isMobile = useMediaQuery(darkTheme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('inventory');
  const [filters, setFilters] = useState({});
  const { cars, filteredCars, loading: carsLoading, stats, brands } = useCars(filters);

  const [form, setForm] = useState(INITIAL_FORM);
  const [addLoading, setAddLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentCar, setCurrentCar] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [carToDelete, setCarToDelete] = useState(null);
  const [sellDialog, setSellDialog] = useState({ open: false, carId: null, buyerName: '' });

  const showMessage = useCallback((type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 4000);
  }, []);

  const handleAddCar = async (e) => {
    e.preventDefault();
    setAddLoading(true);
    try {
      await addCar(uid, form);
      showMessage('success', 'Car added successfully!');
      setForm(INITIAL_FORM);
    } catch (err) {
      showMessage('error', `Error: ${err.message}`);
    } finally {
      setAddLoading(false);
    }
  };

  const handleUpdateCar = async (e) => {
    e.preventDefault();
    if (!currentCar) return;
    setActionLoading(true);
    // Capture old imagePath before overwriting so we can clean up after a successful update
    const oldImagePath = currentCar._originalImagePath || null;
    const imageChanged = oldImagePath && oldImagePath !== currentCar.imagePath;
    try {
      const { id, createdAt: _createdAt, userId: _userId, _originalImagePath, ...data } = currentCar;
      await updateCar(uid, id, {
        ...data,
        year: Number(data.year),
        price: Number(data.price),
        costPrice: Number(data.costPrice) || 0,
        mileage: Number(data.mileage) || 0,
      });
      // Only delete old image AFTER Firestore update succeeds
      if (imageChanged) await deleteCarImage(oldImagePath);
      showMessage('success', 'Car updated!');
    } catch (err) {
      showMessage('error', `Error: ${err.message}`);
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
      await deleteCar(uid, carToDelete.id);
      // Attempt image deletion after Firestore delete — failure here is non-blocking
      if (carToDelete.imagePath) await deleteCarImage(carToDelete.imagePath);
      showMessage('success', 'Car deleted.');
    } catch (err) {
      showMessage('error', `Error: ${err.message}`);
    } finally {
      setActionLoading(false);
      setCarToDelete(null);
      setOpenDeleteDialog(false);
    }
  };

  const handleMarkSold = async () => {
    setActionLoading(true);
    try {
      await markAsSold(uid, sellDialog.carId, sellDialog.buyerName);
      showMessage('success', 'Marked as sold.');
    } catch (err) {
      showMessage('error', `Error: ${err.message}`);
    } finally {
      setActionLoading(false);
      setSellDialog({ open: false, carId: null, buyerName: '' });
    }
  };

  const drawerContent = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ px: 3, py: 3, borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <Typography variant="h5" sx={{ fontWeight: 800, letterSpacing: '-0.5px' }}>
          Motor<span style={{ color: darkTheme.palette.primary.main }}>Vault</span>
        </Typography>
        <Typography variant="caption" sx={{ color: '#555' }}>Dealership Management</Typography>
      </Box>
      <Box sx={{ p: 2, flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
        {[
          { key: 'inventory', label: 'Inventory', icon: <DashboardIcon sx={{ fontSize: 18 }} /> },
          { key: 'sales', label: 'Sales History', icon: <HistoryIcon sx={{ fontSize: 18 }} /> },
          { key: 'analytics', label: 'Analytics', icon: <BarChartIcon sx={{ fontSize: 18 }} /> },
        ].map(({ key, label, icon }) => (
          <Button key={key} fullWidth startIcon={icon}
            onClick={() => { setActiveTab(key); setMobileOpen(false); }}
            sx={{
              justifyContent: 'flex-start', py: 1.2, px: 2, borderRadius: 2, fontWeight: 600,
              color: activeTab === key ? darkTheme.palette.primary.main : '#666',
              bgcolor: activeTab === key ? 'rgba(118,255,3,0.08)' : 'transparent',
              '&:hover': { bgcolor: activeTab === key ? 'rgba(118,255,3,0.14)' : 'rgba(255,255,255,0.04)', color: '#f0f0f0' },
            }}>
            {label}
          </Button>
        ))}
      </Box>
    </Box>
  );

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', bgcolor: 'background.default', minHeight: '100vh' }}>

        <AppBar position="fixed" elevation={0}
          sx={{ zIndex: t => t.zIndex.drawer + 1, bgcolor: '#111', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          <Toolbar sx={{ minHeight: 56 }}>
            {isMobile && (
              <IconButton color="inherit" edge="start" onClick={() => setMobileOpen(o => !o)} sx={{ mr: 1.5 }}>
                <MenuIcon />
              </IconButton>
            )}
            <Typography variant="h6" noWrap sx={{ flexGrow: 1, fontWeight: 700 }}>
              {isMobile ? 'MotorVault' : 'Welcome back, Admin'}
            </Typography>
            <Button
              onClick={() => logout().then(() => navigate('/'))}
              startIcon={<LogoutIcon sx={{ fontSize: 16 }} />}
              sx={{ color: '#888', fontSize: '0.8rem', '&:hover': { color: '#f0f0f0' } }}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>

        <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
          {isMobile ? (
            <Drawer variant="temporary" open={mobileOpen} onClose={() => setMobileOpen(false)}
              ModalProps={{ keepMounted: true }}
              sx={{ '& .MuiDrawer-paper': { width: drawerWidth, bgcolor: '#111' } }}>
              {drawerContent}
            </Drawer>
          ) : (
            <Drawer variant="permanent"
              sx={{ '& .MuiDrawer-paper': { width: drawerWidth, bgcolor: '#111', borderRight: '1px solid rgba(255,255,255,0.07)' } }}>
              {drawerContent}
            </Drawer>
          )}
        </Box>

        <Box component="main" sx={{ flexGrow: 1, p: { xs: 2, sm: 3 }, width: { md: `calc(100% - ${drawerWidth}px)` } }}>
          <Toolbar sx={{ minHeight: '56px !important' }} />
          <Container maxWidth="xl" sx={{ mt: 3, mb: 4 }}>

            {message.text && (
              <Alert severity={message.type} sx={{ mb: 3 }} onClose={() => setMessage({ type: '', text: '' })}>
                {message.text}
              </Alert>
            )}

            <StatsCards stats={stats} loading={carsLoading} />

            {/* Analytics Tab */}
            {activeTab === 'analytics' && (
              <Grid container spacing={3}>
                {/* Full-width revenue chart */}
                <Grid item xs={12}>
                  <RevenueChart cars={cars} />
                </Grid>
                {/* Aged stock — full width on mobile, half on desktop */}
                <Grid item xs={12} lg={5}>
                  <AgedStock cars={cars} />
                </Grid>
                {/* Profit summary panel */}
                <Grid item xs={12} lg={7}>
                  <Paper sx={{ p: { xs: 2.5, sm: 3 }, borderRadius: 3, height: '100%' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                      <Box sx={{ width: 3, height: 20, bgcolor: '#76ff03', borderRadius: 2 }} />
                      <Typography variant="h6">Profit Summary</Typography>
                    </Box>
                    <Grid container spacing={2}>
                      {[
                        { label: 'Total Cars', value: stats.total, color: '#76ff03' },
                        { label: 'Available', value: stats.available, color: '#69f0ae' },
                        { label: 'Sold', value: stats.sold, color: '#f50057' },
                        { label: 'Inventory Value', value: `₦${stats.inventoryValue.toLocaleString()}`, color: '#ffab40' },
                        { label: 'Total Revenue', value: `₦${stats.totalRevenue.toLocaleString()}`, color: '#40c4ff' },
                        { label: 'Total Profit', value: `₦${(stats.totalProfit || 0).toLocaleString()}`, color: '#76ff03' },
                      ].map(({ label, value, color }) => (
                        <Grid item xs={12} sm={6} md={4} key={label}>
                          <Box sx={{
                            p: 2, borderRadius: 2.25,
                            bgcolor: 'rgba(255,255,255,0.02)',
                            border: '1px solid rgba(255,255,255,0.06)',
                            minHeight: 86,
                          }}>
                            <Typography sx={{ fontSize: '0.68rem', color: '#555', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700, mb: 0.75 }}>
                              {label}
                            </Typography>
                            <Typography sx={{ fontSize: '1.1rem', fontWeight: 800, color, lineHeight: 1 }}>
                              {value}
                            </Typography>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </Paper>
                </Grid>
              </Grid>
            )}

            {/* Sales History Tab */}
            {activeTab === 'sales' && (
              <SalesHistory cars={cars} />
            )}

            {/* Inventory Tab */}
            {activeTab === 'inventory' && <Grid container spacing={3}>
              {/* Add Car Form */}
              <Grid item xs={12} lg={4}>
                <Paper sx={{
                  p: { xs: 2.25, sm: 2.75 },
                  borderRadius: 3,
                  position: 'sticky',
                  top: 76,
                  bgcolor: 'rgba(20,20,20,0.94)',
                }}>
                  <SectionHeader title="Add New Car" compact />
                  <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 2.25 }}>
                    Add inventory with complete details and image.
                  </Typography>
                  <Box component="form" onSubmit={handleAddCar}>
                    <CarFormFields data={form} onChange={setForm} />
                    <Button type="submit" variant="contained" disabled={addLoading} fullWidth
                      startIcon={addLoading ? null : <AddIcon />}
                      sx={{ mt: 2.5, py: 1.25, fontWeight: 700, color: '#000' }}>
                      {addLoading ? <CircularProgress size={20} sx={{ color: '#000' }} /> : 'Add Car'}
                    </Button>
                  </Box>
                </Paper>
              </Grid>

              {/* Inventory */}
              <Grid item xs={12} lg={8}>
                <Paper sx={{ p: { xs: 2.25, sm: 2.75 }, borderRadius: 3 }}>
                  <SectionHeader
                    title="Inventory"
                    right={
                      <>
                        {!carsLoading && (
                          <Chip label={`${filteredCars.length} cars`} size="small"
                            sx={{ bgcolor: 'rgba(255,255,255,0.06)', color: '#888', fontWeight: 600 }} />
                        )}
                      <Tooltip title="Export filtered results to CSV">
                        <Button size="small" startIcon={<DownloadIcon sx={{ fontSize: 15 }} />}
                          onClick={() => exportToCSV(filteredCars, 'inventory-filtered.csv')}
                          sx={{ color: '#666', fontSize: '0.75rem', '&:hover': { color: '#76ff03' } }}>
                          Export
                        </Button>
                      </Tooltip>
                      <Tooltip title="Export all cars to CSV">
                        <Button size="small" startIcon={<DownloadIcon sx={{ fontSize: 15 }} />}
                          onClick={() => exportToCSV(cars, 'inventory-all.csv')}
                          sx={{ color: '#666', fontSize: '0.75rem', '&:hover': { color: '#76ff03' } }}>
                          All
                        </Button>
                      </Tooltip>
                      </>
                    }
                    compact
                  />

                  <Filters filters={filters} onChange={setFilters} brands={brands} />

                  {isMobile ? (
                    carsLoading ? <MobileCardSkeleton /> :
                    filteredCars.length === 0 ? (
                      <Box sx={{ textAlign: 'center', py: 7 }}>
                        <Typography sx={{ color: '#444', fontSize: '0.85rem' }}>No cars match your filters.</Typography>
                      </Box>
                    ) : filteredCars.map((car) => {
                      const days = daysInStock(car.createdAt);
                      return (
                        <Box key={car.id} sx={{
                          display: 'flex', gap: 1.5,
                          p: 1.75, mb: 1.25,
                          borderRadius: 2,
                          bgcolor: 'rgba(255,255,255,0.02)',
                          border: '1px solid rgba(255,255,255,0.05)',
                        }}>
                          {/* Thumbnail */}
                          {car.imageUrl ? (
                            <Box component="img" src={car.imageUrl} alt=""
                              sx={{ width: 52, height: 52, objectFit: 'cover', borderRadius: 1.5, flexShrink: 0, alignSelf: 'flex-start' }} />
                          ) : (
                            <Box sx={{ width: 52, height: 52, borderRadius: 1.5, bgcolor: 'rgba(255,255,255,0.04)', flexShrink: 0, alignSelf: 'flex-start' }} />
                          )}

                          {/* Content */}
                          <Box sx={{ flex: 1, minWidth: 0 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 0.25 }}>
                              <Typography sx={{ fontWeight: 700, fontSize: '0.88rem', lineHeight: 1.2, color: '#e0e0e0' }}>
                                {car.brand} {car.model}
                              </Typography>
                              <Chip label={car.status || 'For Sale'} color={car.status === 'Sold' ? 'secondary' : 'success'} size="small" sx={{ ml: 1, flexShrink: 0 }} />
                            </Box>

                            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                              {car.year} · {car.condition}
                              {days !== null && car.status === 'For Sale' && (
                                <Box component="span" sx={{ color: agingColor(days), ml: 0.75 }}>{days}d</Box>
                              )}
                            </Typography>

                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                              <Typography sx={{ fontWeight: 700, fontSize: '0.92rem', color: car.status === 'Sold' ? '#555' : '#efefef',
                                textDecoration: car.status === 'Sold' ? 'line-through' : 'none' }}>
                                ₦{car.price?.toLocaleString()}
                              </Typography>

                              {/* Icon-only action buttons */}
                              <Box sx={{ display: 'flex', gap: 0.5 }}>
                                <ShareListing car={car} />
                                {car.status === 'For Sale' && (
                                  <Tooltip title="Mark as Sold">
                                    <IconButton size="small" color="success" disabled={actionLoading}
                                      onClick={() => setSellDialog({ open: true, carId: car.id, buyerName: '' })}>
                                      <CheckIcon sx={{ fontSize: 15 }} />
                                    </IconButton>
                                  </Tooltip>
                                )}
                                <Tooltip title="Edit">
                                  <IconButton size="small"
                                    onClick={() => { setCurrentCar({ ...car, _originalImagePath: car.imagePath || '' }); setIsEditModalOpen(true); }}>
                                    <EditIcon sx={{ fontSize: 15 }} />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="Delete">
                                  <IconButton size="small" color="secondary"
                                    onClick={() => { setCarToDelete(car); setOpenDeleteDialog(true); }}>
                                    <DeleteIcon sx={{ fontSize: 15 }} />
                                  </IconButton>
                                </Tooltip>
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                      );
                    })
                  ) : (
                    <TableContainer sx={{ border: '1px solid rgba(255,255,255,0.05)' }}>
                      <Table sx={{ '& .MuiTableRow-root:last-of-type .MuiTableCell-root': { borderBottom: 0 } }}>
                        <TableHead>
                          <TableRow>
                            <TableCell>Vehicle</TableCell>
                            <TableCell>Condition</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Age</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell align="right">Actions</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {carsLoading ? <TableSkeleton /> :
                           filteredCars.length === 0 ? (
                            <TableRow>
                              <TableCell colSpan={6} align="center" sx={{ py: 6, color: '#555' }}>
                                No cars match your filters.
                              </TableCell>
                            </TableRow>
                          ) : filteredCars.map((car) => {
                            const days = daysInStock(car.createdAt);
                            return (
                              <TableRow key={car.id} sx={{ '& td': { verticalAlign: 'middle' } }}>
                                <TableCell>
                                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                    {car.imageUrl && (
                                      <Box component="img" src={car.imageUrl} alt=""
                                        sx={{ width: 44, height: 36, objectFit: 'cover', borderRadius: 1.5, flexShrink: 0 }} />
                                    )}
                                    <Box>
                                      <Typography variant="body2" sx={{ fontWeight: 700 }}>{car.brand} {car.model}</Typography>
                                      <Typography variant="caption" color="text.secondary">{car.year}</Typography>
                                    </Box>
                                  </Box>
                                </TableCell>
                                <TableCell>
                                  <Typography variant="body2" color="text.secondary">{car.condition}</Typography>
                                </TableCell>
                                <TableCell>
                                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                    {car.status === 'Sold'
                                      ? <span style={{ textDecoration: 'line-through', color: '#555' }}>₦{car.price?.toLocaleString()}</span>
                                      : `₦${car.price?.toLocaleString()}`}
                                  </Typography>
                                </TableCell>
                                <TableCell>
                                  {car.status === 'For Sale' && days !== null ? (
                                    <Tooltip title={days > 30 ? 'Consider a price review' : `${days} days in stock`}>
                                      <Typography variant="caption" sx={{ color: agingColor(days), fontWeight: days > 30 ? 700 : 400, cursor: 'default' }}>
                                        {days}d
                                      </Typography>
                                    </Tooltip>
                                  ) : <Typography variant="caption" color="text.secondary">—</Typography>}
                                </TableCell>
                                <TableCell>
                                  <Chip label={car.status || 'For Sale'} color={car.status === 'Sold' ? 'secondary' : 'success'} size="small" />
                                </TableCell>
                                <TableCell align="right">
                                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 0.75 }}>
                                    <ShareListing car={car} />
                                    {car.status === 'For Sale' && (
                                      <Tooltip title="Mark as Sold">
                                        <IconButton size="small" color="success" disabled={actionLoading}
                                          sx={{ '&:hover': { color: '#69f0ae' } }}
                                          onClick={() => setSellDialog({ open: true, carId: car.id, buyerName: '' })}>
                                          <CheckIcon sx={{ fontSize: 16 }} />
                                        </IconButton>
                                      </Tooltip>
                                    )}
                                    <Tooltip title="Edit">
                                      <IconButton size="small" sx={{ '&:hover': { color: '#76ff03' } }}
                                        onClick={() => { setCurrentCar({ ...car, _originalImagePath: car.imagePath || '' }); setIsEditModalOpen(true); }}>
                                        <EditIcon sx={{ fontSize: 16 }} />
                                      </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Delete">
                                      <IconButton size="small" color="secondary"
                                        sx={{ '&:hover': { color: '#f50057' } }}
                                        onClick={() => { setCarToDelete(car); setOpenDeleteDialog(true); }}>
                                        <DeleteIcon sx={{ fontSize: 16 }} />
                                      </IconButton>
                                    </Tooltip>
                                  </Box>
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  )}
                </Paper>
              </Grid>
            </Grid>}
          </Container>
        </Box>
      </Box>

      {/* Mark as Sold Dialog */}
      <Dialog open={sellDialog.open} onClose={() => setSellDialog({ open: false, carId: null, buyerName: '' })} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontWeight: 700, borderBottom: '1px solid rgba(255,255,255,0.06)', pb: 1.5 }}>Confirm Sale</DialogTitle>
        <DialogContent>
          <TextField autoFocus fullWidth label="Buyer Name (optional)" margin="normal"
            value={sellDialog.buyerName}
            onChange={e => setSellDialog(s => ({ ...s, buyerName: e.target.value }))} />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <Button onClick={() => setSellDialog({ open: false, carId: null, buyerName: '' })}>Cancel</Button>
          <Button variant="contained" color="success" onClick={handleMarkSold} disabled={actionLoading}
            sx={{ color: '#000', fontWeight: 700 }}>
            {actionLoading ? <CircularProgress size={18} /> : 'Confirm Sale'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Modal */}
      <Dialog open={isEditModalOpen} onClose={() => { setIsEditModalOpen(false); setCurrentCar(null); }}
        fullScreen={isMobile} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 700, borderBottom: '1px solid rgba(255,255,255,0.06)', pb: 1.5 }}>Edit Car</DialogTitle>
        <Box component="form" onSubmit={handleUpdateCar}>
          <DialogContent sx={{ pt: 1.5 }}>
            <CarFormFields data={currentCar || {}} onChange={setCurrentCar} isEdit />
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            <Button onClick={() => { setIsEditModalOpen(false); setCurrentCar(null); }}>Cancel</Button>
            <Button type="submit" variant="contained" disabled={actionLoading} sx={{ color: '#000', fontWeight: 700 }}>
              {actionLoading ? <CircularProgress size={18} /> : 'Save Changes'}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={openDeleteDialog} onClose={() => { setOpenDeleteDialog(false); setCarToDelete(null); }} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontWeight: 700, borderBottom: '1px solid rgba(255,255,255,0.06)', pb: 1.5 }}>Delete Car</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Permanently delete <strong>{carToDelete?.brand} {carToDelete?.model}</strong>? This cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <Button onClick={() => { setOpenDeleteDialog(false); setCarToDelete(null); }}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="secondary" variant="contained" disabled={actionLoading}>
            {actionLoading ? <CircularProgress size={18} /> : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}

export default Dashboard;

import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box, Container, Typography, Button, Grid, Paper, Chip,
  ThemeProvider, CssBaseline, AppBar, Toolbar,
} from '@mui/material';
import InventoryIcon from '@mui/icons-material/Inventory2';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import BarChartIcon from '@mui/icons-material/BarChart';
import ShareIcon from '@mui/icons-material/Share';
import CheckIcon from '@mui/icons-material/Check';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import darkTheme from '../theme';

const VALUE_ITEMS = [
  'Inventory Management',
  'Sales Tracking',
  'Revenue Insights',
  'CSV Export',
  'Aged Stock Alerts',
  'Listing Share Tools',
];

const FEATURES = [
  {
    icon: <InventoryIcon sx={{ fontSize: 24 }} />,
    color: '#76ff03',
    title: 'Smart Inventory Control',
    body: 'Add, edit, track, and organize vehicles in one place. Full CRUD with image upload and real-time Firestore sync.',
  },
  {
    icon: <TrendingUpIcon sx={{ fontSize: 24 }} />,
    color: '#69f0ae',
    title: 'Sales Visibility',
    body: 'Monitor sold vehicles, buyer details, cost price, and profit clearly across your entire sales history.',
  },
  {
    icon: <BarChartIcon sx={{ fontSize: 24 }} />,
    color: '#40c4ff',
    title: 'Analytics Dashboard',
    body: 'View revenue trends, aged stock alerts, and inventory performance metrics at a glance.',
  },
  {
    icon: <ShareIcon sx={{ fontSize: 24 }} />,
    color: '#ffab40',
    title: 'Image Upload & Sharing',
    body: 'Upload car images to cloud storage, export inventory to CSV, and share listings directly to WhatsApp.',
  },
];

const WHY_ITEMS = [
  { title: 'Faster inventory updates', body: 'Add or edit a vehicle in seconds. Changes reflect instantly across the dashboard.' },
  { title: 'Cleaner sales visibility', body: 'See every sale, buyer, profit margin, and sold date in one organised view.' },
  { title: 'Better stock decisions', body: 'Aged stock alerts and inventory value metrics help you act before stock goes stale.' },
  { title: 'Easier daily operations', body: 'One login, one dashboard. No spreadsheets, no confusion, no wasted time.' },
];


function DashboardPreview() {
  const stats = [
    { label: 'Total Cars', value: '24', color: '#76ff03' },
    { label: 'Available', value: '18', color: '#69f0ae' },
    { label: 'Sold', value: '6', color: '#f50057' },
    { label: 'Stock Value', value: '₦48M', color: '#ffab40' },
    { label: 'Revenue', value: '₦12M', color: '#40c4ff' },
  ];

  const rows = [
    { name: 'Toyota Camry', year: '2021', cond: 'Tokunbo', price: '₦8.5M', status: 'For Sale', sc: '#69f0ae' },
    { name: 'Honda Accord', year: '2020', cond: 'Tokunbo', price: '₦7.2M', status: 'For Sale', sc: '#69f0ae' },
    { name: 'Lexus RX 350', year: '2019', cond: 'Nigerian Used', price: '₦14M', status: 'Sold', sc: '#f50057' },
    { name: 'Mercedes C300', year: '2022', cond: 'Brand New', price: '₦32M', status: 'For Sale', sc: '#69f0ae' },
    { name: 'BMW 5 Series', year: '2021', cond: 'Tokunbo', price: '₦22M', status: 'Sold', sc: '#f50057' },
  ];

  return (
    <Box sx={{
      borderRadius: '16px',
      border: '1px solid rgba(255,255,255,0.09)',
      bgcolor: '#0e0e0e',
      overflow: 'hidden',
      boxShadow: '0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04)',
    }}>
      {/* Title bar */}
      <Box sx={{
        px: 3, py: 1.75,
        bgcolor: '#0a0a0a',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        display: 'flex', alignItems: 'center', gap: 1.5,
      }}>
        <Box sx={{ display: 'flex', gap: 0.6 }}>
          {['#f50057', '#ffab40', '#76ff03'].map(c => (
            <Box key={c} sx={{ width: 9, height: 9, borderRadius: '50%', bgcolor: c, opacity: 0.6 }} />
          ))}
        </Box>
        <Typography sx={{ fontSize: '0.7rem', color: '#3a3a3a', fontWeight: 600, ml: 0.5 }}>
          MotorVault — Inventory Dashboard
        </Typography>
        <Box sx={{ ml: 'auto', display: 'flex', gap: 1 }}>
          {['Inventory', 'Sales', 'Analytics'].map(t => (
            <Box key={t} sx={{
              px: 1.25, py: 0.4, borderRadius: '5px',
              bgcolor: t === 'Inventory' ? 'rgba(118,255,3,0.1)' : 'transparent',
              border: t === 'Inventory' ? '1px solid rgba(118,255,3,0.2)' : '1px solid transparent',
            }}>
              <Typography sx={{ fontSize: '0.62rem', fontWeight: 600, color: t === 'Inventory' ? '#76ff03' : '#3a3a3a' }}>
                {t}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      <Box sx={{ p: { xs: 2, sm: 3 } }}>
        {/* Stat cards */}
        <Grid container spacing={1.5} sx={{ mb: 3 }}>
          {stats.map(({ label, value, color }) => (
            <Grid item xs={6} sm={2.4} key={label}>
              <Box sx={{
                p: { xs: 1.5, sm: 2 },
                borderRadius: '10px',
                bgcolor: '#141414',
                border: '1px solid rgba(255,255,255,0.05)',
                position: 'relative', overflow: 'hidden',
                '&::after': {
                  content: '""', position: 'absolute',
                  top: 0, left: 0, right: 0, height: 2,
                  background: `linear-gradient(90deg, ${color}00, ${color}88, ${color}00)`,
                },
              }}>
                <Typography sx={{ fontSize: '0.6rem', color: '#444', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700, mb: 0.75 }}>
                  {label}
                </Typography>
                <Typography sx={{ fontSize: { xs: '1rem', sm: '1.15rem' }, fontWeight: 800, color, lineHeight: 1 }}>
                  {value}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Table */}
        <Box sx={{ borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden' }}>
          <Box sx={{
            display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr',
            px: 2.5, py: 1.25,
            bgcolor: '#0a0a0a',
            borderBottom: '1px solid rgba(255,255,255,0.05)',
          }}>
            {['Vehicle', 'Condition', 'Price', 'Status'].map(h => (
              <Typography key={h} sx={{ fontSize: '0.6rem', color: '#3a3a3a', textTransform: 'uppercase', letterSpacing: '0.09em', fontWeight: 700 }}>
                {h}
              </Typography>
            ))}
          </Box>
          {rows.map((row, i) => (
            <Box key={i} sx={{
              display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr',
              px: 2.5, py: 1.5,
              borderBottom: i < rows.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
              transition: 'background 0.12s',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.02)' },
            }}>
              <Box>
                <Typography sx={{ fontSize: '0.78rem', fontWeight: 700, color: '#d0d0d0', lineHeight: 1.2 }}>{row.name}</Typography>
                <Typography sx={{ fontSize: '0.62rem', color: '#444', mt: 0.25 }}>{row.year}</Typography>
              </Box>
              <Typography sx={{ fontSize: '0.72rem', color: '#666', alignSelf: 'center' }}>{row.cond}</Typography>
              <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: '#bbb', alignSelf: 'center' }}>{row.price}</Typography>
              <Box sx={{ alignSelf: 'center' }}>
                <Box sx={{
                  display: 'inline-flex', px: 1.25, py: 0.35, borderRadius: '6px',
                  bgcolor: `${row.sc}12`, border: `1px solid ${row.sc}28`,
                }}>
                  <Typography sx={{ fontSize: '0.62rem', fontWeight: 700, color: row.sc, lineHeight: 1 }}>{row.status}</Typography>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}


export default function Home() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{ bgcolor: '#0a0a0a', minHeight: '100vh', overflowX: 'hidden' }}>

        {/* ── Navbar ── */}
        <AppBar position="fixed" elevation={0} sx={{
          bgcolor: 'rgba(10,10,10,0.75)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
        }}>
          <Toolbar sx={{ minHeight: 64, px: { xs: 2, md: 4 } }}>
            <Typography sx={{ flexGrow: 1, fontWeight: 800, fontSize: '1.1rem', letterSpacing: '-0.4px', color: '#efefef' }}>
              Motor<span style={{ color: '#76ff03' }}>Vault</span>
            </Typography>
            <Button
              component={Link} to="/dashboard"
              sx={{ color: '#666', fontWeight: 500, mr: 1, fontSize: '0.85rem', '&:hover': { color: '#ccc' } }}
            >
              Dashboard
            </Button>
            <Button
              component={Link} to="/admin"
              variant="contained"
              size="small"
              sx={{
                px: 2.5, py: 0.9, fontWeight: 700, fontSize: '0.82rem',
                color: '#000', bgcolor: '#76ff03',
                '&:hover': { bgcolor: '#8fff2a', boxShadow: '0 0 20px rgba(118,255,3,0.25)' },
              }}
            >
              Sign In
            </Button>
          </Toolbar>
        </AppBar>

        <Box component="main">

          {/* ── Hero ── */}
          <Box sx={{
            pt: { xs: 18, md: 22 },
            pb: { xs: 12, md: 16 },
            position: 'relative',
            overflow: 'hidden',
          }}>
            {/* Background glow */}
            <Box sx={{
              position: 'absolute', top: 0, left: '50%',
              transform: 'translateX(-50%)',
              width: '100%', height: '100%',
              background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(118,255,3,0.06) 0%, transparent 100%)',
              pointerEvents: 'none',
            }} />

            <Container maxWidth="xl" sx={{ px: { xs: 3, md: 6 } }}>
              <Grid container spacing={{ xs: 8, md: 6 }} alignItems="center">

                {/* Left — copy */}
                <Grid item xs={12} md={5}>
                  <Chip
                    label="Dealership Management Platform"
                    size="small"
                    sx={{
                      mb: 3.5,
                      bgcolor: 'rgba(118,255,3,0.07)',
                      color: '#76ff03',
                      border: '1px solid rgba(118,255,3,0.15)',
                      fontWeight: 700,
                      fontSize: '0.68rem',
                      letterSpacing: '0.06em',
                      height: 26,
                    }}
                  />

                  <Typography
                    component="h1"
                    sx={{
                      fontSize: { xs: '2.2rem', sm: '2.8rem', md: '3.2rem', lg: '3.6rem' },
                      fontWeight: 800,
                      lineHeight: 1.08,
                      letterSpacing: '-1px',
                      color: '#efefef',
                      mb: 3,
                    }}
                  >
                    Inventory &amp; Sales{' '}
                    <Box component="span" sx={{
                      color: '#76ff03',
                      display: 'inline-block',
                    }}>
                      Intelligence
                    </Box>
                    {' '}for Modern Car Dealerships
                  </Typography>

                  <Typography sx={{
                    color: '#666',
                    lineHeight: 1.8,
                    mb: 4.5,
                    fontSize: { xs: '0.95rem', md: '1.05rem' },
                    maxWidth: 440,
                  }}>
                    Track inventory, monitor sales, manage stock value, and run your dealership with a faster, cleaner workflow.
                  </Typography>

                  <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', mb: 5 }}>
                    <Button
                      component={Link} to="/admin"
                      variant="contained"
                      size="large"
                      endIcon={<ArrowForwardIcon sx={{ fontSize: 18 }} />}
                      sx={{
                        px: 3.5, py: 1.5,
                        fontWeight: 700, fontSize: '0.9rem',
                        color: '#000', bgcolor: '#76ff03',
                        '&:hover': { bgcolor: '#8fff2a', boxShadow: '0 0 28px rgba(118,255,3,0.28)' },
                      }}
                    >
                      Get Started
                    </Button>
                    <Button
                      component={Link} to="/dashboard"
                      variant="outlined"
                      size="large"
                      sx={{
                        px: 3.5, py: 1.5,
                        fontWeight: 600, fontSize: '0.9rem',
                        borderColor: 'rgba(255,255,255,0.1)',
                        color: '#999',
                        '&:hover': { borderColor: 'rgba(255,255,255,0.25)', color: '#efefef', bgcolor: 'rgba(255,255,255,0.03)' },
                      }}
                    >
                      View Dashboard
                    </Button>
                  </Box>

                  {/* Trust row */}
                  <Box sx={{ display: 'flex', gap: 3.5, flexWrap: 'wrap' }}>
                    {[
                      { value: 'Real-time', label: 'inventory sync' },
                      { value: 'Built-in', label: 'sales tracking' },
                      { value: 'Full', label: 'revenue visibility' },
                    ].map(({ value, label }) => (
                      <Box key={label} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box sx={{
                          width: 18, height: 18, borderRadius: '50%',
                          bgcolor: 'rgba(118,255,3,0.1)',
                          border: '1px solid rgba(118,255,3,0.2)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                        }}>
                          <CheckIcon sx={{ fontSize: 10, color: '#76ff03' }} />
                        </Box>
                        <Box>
                          <Typography component="span" sx={{ fontSize: '0.82rem', fontWeight: 700, color: '#ccc' }}>{value} </Typography>
                          <Typography component="span" sx={{ fontSize: '0.82rem', color: '#555' }}>{label}</Typography>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </Grid>

                {/* Right — dashboard preview */}
                <Grid item xs={12} md={7}>
                  <Box sx={{
                    transform: { md: 'perspective(1200px) rotateY(-2deg) rotateX(1deg)' },
                    transition: 'transform 0.4s ease',
                    '&:hover': { transform: { md: 'perspective(1200px) rotateY(0deg) rotateX(0deg)' } },
                  }}>
                    <DashboardPreview />
                  </Box>
                </Grid>

              </Grid>
            </Container>
          </Box>

          {/* ── Value strip ── */}
          <Box sx={{
            borderTop: '1px solid rgba(255,255,255,0.05)',
            borderBottom: '1px solid rgba(255,255,255,0.05)',
            py: 3.5,
            bgcolor: 'rgba(255,255,255,0.015)',
          }}>
            <Container maxWidth="lg">
              <Box sx={{
                display: 'flex', gap: { xs: 2.5, md: 4 },
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {VALUE_ITEMS.map(label => (
                  <Box key={label} sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                    <CheckIcon sx={{ fontSize: 13, color: '#76ff03' }} />
                    <Typography sx={{ fontSize: '0.82rem', color: '#777', fontWeight: 500, whiteSpace: 'nowrap' }}>
                      {label}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Container>
          </Box>

          {/* ── Features ── */}
          <Box sx={{ py: { xs: 12, md: 18 } }}>
            <Container maxWidth="lg">
              <Box sx={{ mb: 9 }}>
                <Typography sx={{
                  fontSize: '0.7rem', fontWeight: 700, color: '#76ff03',
                  textTransform: 'uppercase', letterSpacing: '0.14em',
                  display: 'block', mb: 2,
                }}>
                  Core Features
                </Typography>
                <Typography variant="h3" sx={{
                  color: '#efefef', mb: 2.5,
                  maxWidth: 560, lineHeight: 1.15,
                  fontSize: { xs: '1.8rem', md: '2.4rem' },
                }}>
                  Everything a modern dealership needs to stay in control
                </Typography>
                <Typography sx={{ color: '#666', maxWidth: 480, lineHeight: 1.8, fontSize: '1rem' }}>
                  MotorVault brings inventory, sales, media, and reporting into one focused dealership workflow.
                </Typography>
              </Box>

              <Grid container spacing={3}>
                {FEATURES.map((f, i) => (
                  <Grid item xs={12} sm={6} md={3} key={f.title}>
                    <Paper sx={{
                      p: 3.5, borderRadius: 3, height: '100%',
                      bgcolor: i % 2 === 1 ? '#111' : '#0e0e0e',
                      transition: 'transform 0.2s, box-shadow 0.2s, border-color 0.2s',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: `0 20px 48px ${f.color}0f`,
                        borderColor: `${f.color}28`,
                      },
                    }}>
                      <Box sx={{
                        width: 48, height: 48, borderRadius: '12px',
                        bgcolor: `${f.color}0f`,
                        border: `1px solid ${f.color}20`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: f.color, mb: 2.5,
                      }}>
                        {f.icon}
                      </Box>
                      <Typography sx={{ fontWeight: 700, fontSize: '0.95rem', color: '#e0e0e0', mb: 1.25, lineHeight: 1.3 }}>
                        {f.title}
                      </Typography>
                      <Typography sx={{ color: '#666', fontSize: '0.85rem', lineHeight: 1.75 }}>
                        {f.body}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Container>
          </Box>

          {/* ── Why MotorVault ── */}
          <Box sx={{
            py: { xs: 12, md: 18 },
            bgcolor: '#080808',
            borderTop: '1px solid rgba(255,255,255,0.05)',
            borderBottom: '1px solid rgba(255,255,255,0.05)',
          }}>
            <Container maxWidth="lg">
              <Grid container spacing={{ xs: 8, md: 10 }} alignItems="flex-start">

                {/* Left */}
                <Grid item xs={12} md={5}>
                  <Typography sx={{
                    fontSize: '0.7rem', fontWeight: 700, color: '#76ff03',
                    textTransform: 'uppercase', letterSpacing: '0.14em',
                    display: 'block', mb: 2,
                  }}>
                    Why MotorVault
                  </Typography>
                  <Typography variant="h3" sx={{
                    color: '#efefef', mb: 2.5, lineHeight: 1.15,
                    fontSize: { xs: '1.8rem', md: '2.2rem' },
                  }}>
                    Built for dealerships that need clarity, speed, and control
                  </Typography>
                  <Typography sx={{ color: '#666', lineHeight: 1.8, fontSize: '0.95rem', mb: 4 }}>
                    MotorVault helps dealership teams manage stock, sales, and day-to-day workflow with less clutter and better visibility.
                  </Typography>
                  <Button
                    component={Link} to="/admin"
                    variant="outlined"
                    endIcon={<ArrowForwardIcon sx={{ fontSize: 16 }} />}
                    sx={{
                      px: 3, py: 1.25, fontWeight: 600, fontSize: '0.85rem',
                      borderColor: 'rgba(255,255,255,0.1)', color: '#888',
                      '&:hover': { borderColor: '#76ff03', color: '#76ff03', bgcolor: 'rgba(118,255,3,0.04)' },
                    }}
                  >
                    Get started free
                  </Button>
                </Grid>

                {/* Right — 2×2 benefit panels */}
                <Grid item xs={12} md={7}>
                  <Grid container spacing={2}>
                    {WHY_ITEMS.map(({ title, body }, i) => (
                      <Grid item xs={12} sm={6} key={title}>
                        <Box sx={{
                          p: 3, borderRadius: 3,
                          bgcolor: '#0e0e0e',
                          border: '1px solid rgba(255,255,255,0.06)',
                          height: '100%',
                          transition: 'border-color 0.2s, background 0.2s',
                          '&:hover': {
                            borderColor: 'rgba(118,255,3,0.2)',
                            bgcolor: 'rgba(118,255,3,0.02)',
                          },
                        }}>
                          <Box sx={{
                            width: 28, height: 28, borderRadius: '8px',
                            bgcolor: 'rgba(118,255,3,0.08)',
                            border: '1px solid rgba(118,255,3,0.15)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            mb: 2,
                          }}>
                            <CheckIcon sx={{ fontSize: 14, color: '#76ff03' }} />
                          </Box>
                          <Typography sx={{ fontWeight: 700, fontSize: '0.88rem', color: '#d0d0d0', mb: 1, lineHeight: 1.3 }}>
                            {title}
                          </Typography>
                          <Typography sx={{ color: '#555', fontSize: '0.82rem', lineHeight: 1.7 }}>
                            {body}
                          </Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>

              </Grid>
            </Container>
          </Box>

          {/* ── Final CTA ── */}
          <Box sx={{
            py: { xs: 14, md: 20 },
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <Box sx={{
              position: 'absolute', bottom: '-40%', left: '50%',
              transform: 'translateX(-50%)',
              width: '70%', height: '100%',
              background: 'radial-gradient(ellipse, rgba(118,255,3,0.05) 0%, transparent 70%)',
              pointerEvents: 'none',
            }} />
            <Container maxWidth="sm" sx={{ position: 'relative' }}>
              <Typography sx={{
                fontSize: { xs: '1.8rem', md: '2.6rem' },
                fontWeight: 800, letterSpacing: '-0.5px',
                color: '#efefef', mb: 2.5, lineHeight: 1.1,
              }}>
                Run your dealership with more control
              </Typography>
              <Typography sx={{ color: '#666', lineHeight: 1.8, mb: 5, fontSize: '1rem' }}>
                MotorVault gives you a cleaner way to manage inventory, sales, and daily vehicle operations.
              </Typography>
              <Button
                component={Link} to="/admin"
                variant="contained"
                size="large"
                endIcon={<ArrowForwardIcon />}
                sx={{
                  px: 5, py: 1.75,
                  fontWeight: 700, fontSize: '0.95rem',
                  color: '#000', bgcolor: '#76ff03',
                  '&:hover': { bgcolor: '#8fff2a', boxShadow: '0 0 40px rgba(118,255,3,0.25)' },
                }}
              >
                Open Dashboard
              </Button>
            </Container>
          </Box>

          {/* ── Footer ── */}
          <Box sx={{
            borderTop: '1px solid rgba(255,255,255,0.06)',
            py: 4,
            bgcolor: '#080808',
          }}>
            <Container maxWidth="lg">
              <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 2,
              }}>
                <Typography sx={{ fontWeight: 800, fontSize: '1rem', letterSpacing: '-0.3px', color: '#555' }}>
                  Motor<span style={{ color: '#76ff03' }}>Vault</span>
                </Typography>
                <Typography sx={{ color: '#333', fontSize: '0.8rem' }}>
                  © {new Date().getFullYear()} MotorVault. Built by{' '}
                  <Box
                    component="a"
                    href="https://github.com/ShoElj"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      color: '#555',
                      textDecoration: 'none',
                      fontWeight: 600,
                      transition: 'color 0.15s',
                      '&:hover': { color: '#76ff03' },
                    }}
                  >
                    @ShoElj
                  </Box>
                </Typography>
                <Button
                  component={Link} to="/admin"
                  size="small"
                  sx={{ color: '#444', fontSize: '0.78rem', '&:hover': { color: '#888' } }}
                >
                  Sign In →
                </Button>
              </Box>
            </Container>
          </Box>

        </Box>
      </Box>
    </ThemeProvider>
  );
}

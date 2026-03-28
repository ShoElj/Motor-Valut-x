import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Paper,
  Chip,
  ThemeProvider,
  CssBaseline,
  AppBar,
  Toolbar,
  Stack,
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
    body: 'Add, edit, track, and organize vehicles in one place with image upload and real-time updates.',
  },
  {
    icon: <TrendingUpIcon sx={{ fontSize: 24 }} />,
    color: '#69f0ae',
    title: 'Sales Visibility',
    body: 'Monitor sold vehicles, buyer details, cost price, and profit clearly across your sales history.',
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
    body: 'Upload car images, export inventory to CSV, and share listings quickly to WhatsApp.',
  },
];

const WHY_ITEMS = [
  {
    title: 'Faster inventory updates',
    body: 'Add or edit a vehicle in seconds. Changes reflect instantly across the dashboard.',
  },
  {
    title: 'Cleaner sales visibility',
    body: 'See every sale, buyer, profit margin, and sold date in one organised view.',
  },
  {
    title: 'Better stock decisions',
    body: 'Aged stock alerts and inventory value metrics help you act before stock goes stale.',
  },
  {
    title: 'Easier daily operations',
    body: 'One login, one dashboard. No spreadsheets, no confusion, no wasted time.',
  },
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
  ];

  return (
    <Box
      sx={{
        borderRadius: '24px',
        border: '1px solid rgba(255,255,255,0.08)',
        bgcolor: '#0d0d0d',
        overflow: 'hidden',
        boxShadow: '0 40px 120px rgba(0,0,0,0.75), 0 0 0 1px rgba(255,255,255,0.03)',
      }}
    >
      <Box
        sx={{
          px: { xs: 2, md: 3 },
          py: 1.8,
          bgcolor: '#0a0a0a',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          display: 'flex',
          alignItems: 'center',
          gap: 1.25,
        }}
      >
        <Box sx={{ display: 'flex', gap: 0.7 }}>
          {['#f50057', '#ffab40', '#76ff03'].map((c) => (
            <Box
              key={c}
              sx={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                bgcolor: c,
                opacity: 0.7,
              }}
            />
          ))}
        </Box>

        <Typography
          sx={{
            fontSize: '0.76rem',
            color: 'rgba(255,255,255,0.35)',
            fontWeight: 700,
            ml: 0.5,
          }}
        >
          MotorVault — Inventory Dashboard
        </Typography>

        <Box sx={{ ml: 'auto', display: 'flex', gap: 1 }}>
          {['Inventory', 'Sales', 'Analytics'].map((t) => (
            <Box
              key={t}
              sx={{
                px: 1.3,
                py: 0.45,
                borderRadius: '8px',
                bgcolor: t === 'Inventory' ? 'rgba(118,255,3,0.1)' : 'transparent',
                border:
                  t === 'Inventory'
                    ? '1px solid rgba(118,255,3,0.18)'
                    : '1px solid transparent',
              }}
            >
              <Typography
                sx={{
                  fontSize: '0.64rem',
                  fontWeight: 700,
                  color: t === 'Inventory' ? '#76ff03' : 'rgba(255,255,255,0.28)',
                }}
              >
                {t}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      <Box sx={{ p: { xs: 2, sm: 3, md: 3.5 } }}>
        <Grid container spacing={1.75} sx={{ mb: 3 }}>
          {stats.map(({ label, value, color }) => (
            <Grid item xs={6} md={2.4} key={label}>
              <Box
                sx={{
                  p: { xs: 1.75, md: 2.1 },
                  borderRadius: '14px',
                  bgcolor: '#141414',
                  border: '1px solid rgba(255,255,255,0.05)',
                  position: 'relative',
                  overflow: 'hidden',
                  minHeight: 86,
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 2,
                    background: `linear-gradient(90deg, ${color}00, ${color}88, ${color}00)`,
                  },
                }}
              >
                <Typography
                  sx={{
                    fontSize: '0.66rem',
                    color: 'rgba(255,255,255,0.35)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.09em',
                    fontWeight: 700,
                    mb: 1,
                  }}
                >
                  {label}
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: '1.05rem', md: '1.35rem' },
                    fontWeight: 800,
                    color,
                    lineHeight: 1,
                  }}
                >
                  {value}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

        <Box
          sx={{
            borderRadius: '14px',
            border: '1px solid rgba(255,255,255,0.05)',
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr 1fr 1fr',
              px: 2.5,
              py: 1.35,
              bgcolor: '#0a0a0a',
              borderBottom: '1px solid rgba(255,255,255,0.05)',
            }}
          >
            {['Vehicle', 'Condition', 'Price', 'Status'].map((h) => (
              <Typography
                key={h}
                sx={{
                  fontSize: '0.64rem',
                  color: 'rgba(255,255,255,0.3)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  fontWeight: 700,
                }}
              >
                {h}
              </Typography>
            ))}
          </Box>

          {rows.map((row, i) => (
            <Box
              key={i}
              sx={{
                display: 'grid',
                gridTemplateColumns: '2fr 1fr 1fr 1fr',
                px: 2.5,
                py: 1.55,
                borderBottom:
                  i < rows.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.02)' },
              }}
            >
              <Box>
                <Typography
                  sx={{
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    color: '#d8d8d8',
                    lineHeight: 1.2,
                  }}
                >
                  {row.name}
                </Typography>
                <Typography
                  sx={{
                    fontSize: '0.66rem',
                    color: 'rgba(255,255,255,0.32)',
                    mt: 0.3,
                  }}
                >
                  {row.year}
                </Typography>
              </Box>

              <Typography sx={{ fontSize: '0.76rem', color: '#8a8a8a', alignSelf: 'center' }}>
                {row.cond}
              </Typography>

              <Typography
                sx={{
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  color: '#cfcfcf',
                  alignSelf: 'center',
                }}
              >
                {row.price}
              </Typography>

              <Box sx={{ alignSelf: 'center' }}>
                <Box
                  sx={{
                    display: 'inline-flex',
                    px: 1.3,
                    py: 0.42,
                    borderRadius: '8px',
                    bgcolor: `${row.sc}12`,
                    border: `1px solid ${row.sc}28`,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: '0.65rem',
                      fontWeight: 700,
                      color: row.sc,
                      lineHeight: 1,
                    }}
                  >
                    {row.status}
                  </Typography>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

function FeatureCard({ feature, index }) {
  return (
    <Paper
      sx={{
        p: 4,
        borderRadius: 4,
        height: '100%',
        bgcolor: index % 2 === 0 ? '#101010' : '#131313',
        border: '1px solid rgba(255,255,255,0.06)',
        transition: 'transform 0.2s, box-shadow 0.2s, border-color 0.2s',
        '&:hover': {
          transform: 'translateY(-6px)',
          boxShadow: `0 24px 60px ${feature.color}12`,
          borderColor: `${feature.color}30`,
        },
      }}
    >
      <Box
        sx={{
          width: 56,
          height: 56,
          borderRadius: '16px',
          bgcolor: `${feature.color}10`,
          border: `1px solid ${feature.color}28`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: feature.color,
          mb: 3,
        }}
      >
        {feature.icon}
      </Box>

      <Typography
        sx={{
          fontWeight: 700,
          fontSize: '1.05rem',
          color: '#ececec',
          mb: 1.5,
          lineHeight: 1.3,
        }}
      >
        {feature.title}
      </Typography>

      <Typography
        sx={{
          color: 'rgba(255,255,255,0.56)',
          fontSize: '0.92rem',
          lineHeight: 1.85,
        }}
      >
        {feature.body}
      </Typography>
    </Paper>
  );
}

export default function Home() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />

      <Box sx={{ bgcolor: '#090909', minHeight: '100vh', overflowX: 'hidden' }}>
        <AppBar
          position="fixed"
          elevation={0}
          sx={{
            bgcolor: 'rgba(10,10,10,0.72)',
            backdropFilter: 'blur(18px)',
            WebkitBackdropFilter: 'blur(18px)',
            borderBottom: '1px solid rgba(255,255,255,0.05)',
          }}
        >
          <Toolbar sx={{ minHeight: 68, px: { xs: 2, md: 4 } }}>
            <Typography
              sx={{
                flexGrow: 1,
                fontWeight: 800,
                fontSize: '1.15rem',
                letterSpacing: '-0.4px',
                color: '#efefef',
              }}
            >
              Motor<span style={{ color: '#76ff03' }}>Vault</span>
            </Typography>

            <Button
              component={Link}
              to="/dashboard"
              sx={{
                color: 'rgba(255,255,255,0.5)',
                fontWeight: 600,
                mr: 1,
                fontSize: '0.88rem',
                '&:hover': { color: '#ddd' },
              }}
            >
              Dashboard
            </Button>

            <Button
              component={Link}
              to="/admin"
              variant="contained"
              size="small"
              sx={{
                px: 2.75,
                py: 0.95,
                fontWeight: 700,
                fontSize: '0.82rem',
                color: '#000',
                bgcolor: '#76ff03',
                '&:hover': {
                  bgcolor: '#8fff2a',
                  boxShadow: '0 0 24px rgba(118,255,3,0.26)',
                },
              }}
            >
              Sign In
            </Button>
          </Toolbar>
        </AppBar>

        <Box component="main">
          <Box
            sx={{
              pt: { xs: 16, md: 22 },
              pb: { xs: 12, md: 16 },
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '100%',
                height: '100%',
                background:
                  'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(118,255,3,0.08) 0%, transparent 100%)',
                pointerEvents: 'none',
              }}
            />

            <Container maxWidth="xl" sx={{ px: { xs: 3, md: 6 } }}>
              <Grid container spacing={{ xs: 7, md: 6 }} alignItems="center">
                <Grid item xs={12} md={5}>
                  <Chip
                    label="Dealership Management Platform"
                    size="small"
                    sx={{
                      mb: 3.5,
                      bgcolor: 'rgba(118,255,3,0.08)',
                      color: '#76ff03',
                      border: '1px solid rgba(118,255,3,0.16)',
                      fontWeight: 700,
                      fontSize: '0.7rem',
                      letterSpacing: '0.06em',
                      height: 28,
                    }}
                  />

                  <Typography
                    component="h1"
                    sx={{
                      fontSize: { xs: '2.5rem', sm: '3.2rem', md: '4.4rem', lg: '5rem' },
                      fontWeight: 800,
                      lineHeight: 0.98,
                      letterSpacing: '-0.06em',
                      color: '#f2f2f2',
                      mb: 3.25,
                      maxWidth: 760,
                    }}
                  >
                    Inventory &amp; Sales{' '}
                    <Box component="span" sx={{ color: '#76ff03', display: 'inline-block' }}>
                      Intelligence
                    </Box>{' '}
                    for Modern Car Dealerships
                  </Typography>

                  <Typography
                    sx={{
                      color: 'rgba(255,255,255,0.6)',
                      lineHeight: 1.9,
                      mb: 5,
                      fontSize: { xs: '1rem', md: '1.06rem' },
                      maxWidth: 480,
                    }}
                  >
                    Track inventory, monitor sales, manage stock value, and run your dealership with a faster, cleaner workflow.
                  </Typography>

                  <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 5 }}>
                    <Button
                      component={Link}
                      to="/admin"
                      variant="contained"
                      size="large"
                      endIcon={<ArrowForwardIcon sx={{ fontSize: 18 }} />}
                      sx={{
                        px: 4.25,
                        py: 1.5,
                        fontWeight: 700,
                        fontSize: '0.95rem',
                        color: '#000',
                        bgcolor: '#76ff03',
                        '&:hover': {
                          bgcolor: '#8fff2a',
                          boxShadow: '0 0 32px rgba(118,255,3,0.28)',
                        },
                      }}
                    >
                      Get Started
                    </Button>

                    <Button
                      component={Link}
                      to="/dashboard"
                      variant="outlined"
                      size="large"
                      sx={{
                        px: 4.25,
                        py: 1.5,
                        fontWeight: 600,
                        fontSize: '0.95rem',
                        borderColor: 'rgba(255,255,255,0.12)',
                        color: '#bcbcbc',
                        '&:hover': {
                          borderColor: 'rgba(255,255,255,0.28)',
                          color: '#efefef',
                          bgcolor: 'rgba(255,255,255,0.03)',
                        },
                      }}
                    >
                      View Dashboard
                    </Button>
                  </Box>

                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1.5, sm: 3.5 }}>
                    {[
                      { value: 'Real-time', label: 'inventory sync' },
                      { value: 'Built-in', label: 'sales tracking' },
                      { value: 'Full', label: 'revenue visibility' },
                    ].map(({ value, label }) => (
                      <Box key={label} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box
                          sx={{
                            width: 18,
                            height: 18,
                            borderRadius: '50%',
                            bgcolor: 'rgba(118,255,3,0.1)',
                            border: '1px solid rgba(118,255,3,0.2)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                          }}
                        >
                          <CheckIcon sx={{ fontSize: 10, color: '#76ff03' }} />
                        </Box>
                        <Box>
                          <Typography component="span" sx={{ fontSize: '0.84rem', fontWeight: 700, color: '#ddd' }}>
                            {value}{' '}
                          </Typography>
                          <Typography component="span" sx={{ fontSize: '0.84rem', color: '#707070' }}>
                            {label}
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                  </Stack>
                </Grid>

                <Grid item xs={12} md={7}>
                  <Box sx={{ position: 'relative' }}>
                    <Box
                      sx={{
                        position: 'absolute',
                        top: '10%',
                        left: '8%',
                        right: '8%',
                        bottom: '10%',
                        background:
                          'radial-gradient(ellipse, rgba(118,255,3,0.12) 0%, transparent 70%)',
                        filter: 'blur(40px)',
                        pointerEvents: 'none',
                        zIndex: 0,
                      }}
                    />
                    <Box
                      sx={{
                        position: 'relative',
                        zIndex: 1,
                        transform: { md: 'perspective(1400px) rotateY(-3deg) rotateX(1.5deg) scale(1.04)' },
                        transition: 'transform 0.45s ease',
                        '&:hover': {
                          transform: { md: 'perspective(1400px) rotateY(0deg) rotateX(0deg) scale(1.05)' },
                        },
                      }}
                    >
                      <DashboardPreview />
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Container>
          </Box>

          <Box
            sx={{
              borderTop: '1px solid rgba(255,255,255,0.05)',
              borderBottom: '1px solid rgba(255,255,255,0.05)',
              py: 3.5,
              bgcolor: 'rgba(255,255,255,0.015)',
            }}
          >
            <Container maxWidth="xl" sx={{ px: { xs: 3, md: 6 } }}>
              <Box
                sx={{
                  display: 'flex',
                  gap: { xs: 2.25, md: 4 },
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {VALUE_ITEMS.map((label) => (
                  <Box key={label} sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                    <CheckIcon sx={{ fontSize: 13, color: '#76ff03' }} />
                    <Typography
                      sx={{
                        fontSize: '0.84rem',
                        color: '#8a8a8a',
                        fontWeight: 500,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {label}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Container>
          </Box>

          <Box sx={{ py: { xs: 11, md: 16 } }}>
            <Container maxWidth="xl" sx={{ px: { xs: 3, md: 6 } }}>
              <Box sx={{ mb: 7.5, maxWidth: 860 }}>
                <Typography
                  sx={{
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    color: '#76ff03',
                    textTransform: 'uppercase',
                    letterSpacing: '0.14em',
                    display: 'block',
                    mb: 2,
                  }}
                >
                  Core Features
                </Typography>

                <Typography
                  sx={{
                    color: '#efefef',
                    mb: 1.75,
                    lineHeight: 1.1,
                    fontSize: { xs: '2rem', md: '3rem' },
                    fontWeight: 800,
                    letterSpacing: '-0.04em',
                    maxWidth: 760,
                  }}
                >
                  Everything a modern dealership needs to stay in control
                </Typography>

                <Typography
                  sx={{
                    color: 'rgba(255,255,255,0.58)',
                    lineHeight: 1.85,
                    fontSize: '1rem',
                    maxWidth: 620,
                  }}
                >
                  MotorVault brings inventory, sales, media, and reporting into one focused dealership workflow.
                </Typography>
              </Box>

              <Grid container spacing={3.5}>
                {FEATURES.map((feature, index) => (
                  <Grid item xs={12} md={6} key={feature.title}>
                    <FeatureCard feature={feature} index={index} />
                  </Grid>
                ))}
              </Grid>
            </Container>
          </Box>

          <Box
            sx={{
              py: { xs: 11, md: 16 },
              bgcolor: '#080808',
              borderTop: '1px solid rgba(255,255,255,0.05)',
              borderBottom: '1px solid rgba(255,255,255,0.05)',
            }}
          >
            <Container maxWidth="xl" sx={{ px: { xs: 3, md: 6 } }}>
              <Grid container spacing={{ xs: 7, md: 8 }} alignItems="flex-start">
                <Grid item xs={12} md={5}>
                  <Typography
                    sx={{
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      color: '#76ff03',
                      textTransform: 'uppercase',
                      letterSpacing: '0.14em',
                      display: 'block',
                      mb: 2,
                    }}
                  >
                    Why MotorVault
                  </Typography>

                  <Typography
                    sx={{
                      color: '#efefef',
                      mb: 2.5,
                      lineHeight: 1.12,
                      fontSize: { xs: '2rem', md: '2.8rem' },
                      fontWeight: 800,
                      letterSpacing: '-0.04em',
                    }}
                  >
                    Built for dealerships that need clarity, speed, and control
                  </Typography>

                  <Typography
                    sx={{
                      color: 'rgba(255,255,255,0.56)',
                      lineHeight: 1.85,
                      fontSize: '1rem',
                      mb: 4,
                      maxWidth: 470,
                    }}
                  >
                    MotorVault helps dealership teams manage stock, sales, and day-to-day workflow with less clutter and better visibility.
                  </Typography>

                  <Button
                    component={Link}
                    to="/admin"
                    variant="outlined"
                    endIcon={<ArrowForwardIcon sx={{ fontSize: 16 }} />}
                    sx={{
                      px: 3,
                      py: 1.25,
                      fontWeight: 600,
                      fontSize: '0.9rem',
                      borderColor: 'rgba(255,255,255,0.1)',
                      color: '#aaa',
                      '&:hover': {
                        borderColor: '#76ff03',
                        color: '#76ff03',
                        bgcolor: 'rgba(118,255,3,0.04)',
                      },
                    }}
                  >
                    Get started free
                  </Button>
                </Grid>

                <Grid item xs={12} md={7}>
                  <Grid container spacing={2.25}>
                    {WHY_ITEMS.map(({ title, body }) => (
                      <Grid item xs={12} sm={6} key={title}>
                        <Box
                          sx={{
                            p: 3.5,
                            borderRadius: 4,
                            bgcolor: '#0f0f0f',
                            border: '1px solid rgba(255,255,255,0.07)',
                            height: '100%',
                            boxShadow: '0 8px 28px rgba(0,0,0,0.22)',
                            transition: 'border-color 0.2s, background 0.2s, box-shadow 0.2s, transform 0.2s',
                            '&:hover': {
                              borderColor: 'rgba(118,255,3,0.22)',
                              bgcolor: 'rgba(118,255,3,0.025)',
                              boxShadow:
                                '0 12px 36px rgba(0,0,0,0.35), 0 0 0 1px rgba(118,255,3,0.08)',
                              transform: 'translateY(-3px)',
                            },
                          }}
                        >
                          <Box
                            sx={{
                              width: 34,
                              height: 34,
                              borderRadius: '10px',
                              bgcolor: 'rgba(118,255,3,0.09)',
                              border: '1px solid rgba(118,255,3,0.18)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              mb: 2.25,
                            }}
                          >
                            <CheckIcon sx={{ fontSize: 15, color: '#76ff03' }} />
                          </Box>

                          <Typography
                            sx={{
                              fontWeight: 700,
                              fontSize: '0.94rem',
                              color: '#e2e2e2',
                              mb: 1.2,
                              lineHeight: 1.3,
                            }}
                          >
                            {title}
                          </Typography>

                          <Typography
                            sx={{
                              color: 'rgba(255,255,255,0.5)',
                              fontSize: '0.86rem',
                              lineHeight: 1.8,
                            }}
                          >
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

          <Box
            sx={{
              py: { xs: 13, md: 18 },
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: '-20%',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '70%',
                height: '90%',
                background:
                  'radial-gradient(ellipse, rgba(118,255,3,0.08) 0%, transparent 72%)',
                pointerEvents: 'none',
              }}
            />

            <Container maxWidth="md" sx={{ position: 'relative' }}>
              <Typography
                sx={{
                  fontSize: { xs: '2.2rem', md: '3.3rem' },
                  fontWeight: 800,
                  letterSpacing: '-0.05em',
                  color: '#efefef',
                  mb: 2.25,
                  lineHeight: 1.05,
                }}
              >
                Run your dealership with more control
              </Typography>

              <Typography
                sx={{
                  color: 'rgba(255,255,255,0.58)',
                  lineHeight: 1.85,
                  mb: 5,
                  fontSize: '1rem',
                  maxWidth: 520,
                  mx: 'auto',
                }}
              >
                MotorVault gives you a cleaner way to manage inventory, sales, and daily vehicle operations.
              </Typography>

              <Button
                component={Link}
                to="/admin"
                variant="contained"
                size="large"
                endIcon={<ArrowForwardIcon />}
                sx={{
                  px: 6,
                  py: 1.85,
                  fontWeight: 700,
                  fontSize: '0.98rem',
                  color: '#000',
                  bgcolor: '#76ff03',
                  '&:hover': {
                    bgcolor: '#8fff2a',
                    boxShadow: '0 0 44px rgba(118,255,3,0.3)',
                  },
                }}
              >
                Open Dashboard
              </Button>
            </Container>
          </Box>

          <Box
            sx={{
              borderTop: '1px solid rgba(255,255,255,0.07)',
              py: 4.5,
              bgcolor: '#080808',
            }}
          >
            <Container maxWidth="xl" sx={{ px: { xs: 3, md: 6 } }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: 2,
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 800,
                    fontSize: '1rem',
                    letterSpacing: '-0.3px',
                    color: '#9a9a9a',
                  }}
                >
                  Motor<span style={{ color: '#76ff03' }}>Vault</span>
                </Typography>

                <Typography sx={{ color: '#666', fontSize: '0.84rem' }}>
                  © {new Date().getFullYear()} MotorVault. Built by{' '}
                  <Box
                    component="a"
                    href="https://github.com/ShoElj"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      color: '#8a8a8a',
                      textDecoration: 'none',
                      fontWeight: 600,
                      '&:hover': { color: '#76ff03' },
                    }}
                  >
                    @ShoElj
                  </Box>
                </Typography>

                <Button
                  component={Link}
                  to="/admin"
                  size="small"
                  sx={{
                    color: '#7a7a7a',
                    fontSize: '0.8rem',
                    '&:hover': { color: '#d0d0d0' },
                  }}
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
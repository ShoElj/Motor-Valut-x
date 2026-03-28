import React from 'react';
import { Grid, Paper, Typography, Box, Skeleton } from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import SellIcon from '@mui/icons-material/Sell';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';

const CARDS = [
  { key: 'total',          label: 'Total Cars',      Icon: DirectionsCarIcon,        color: '#76ff03' },
  { key: 'available',      label: 'Available',       Icon: SellIcon,                 color: '#69f0ae' },
  { key: 'sold',           label: 'Sold',            Icon: CheckCircleIcon,          color: '#f50057' },
  { key: 'inventoryValue', label: 'Inventory Value', Icon: AccountBalanceWalletIcon, color: '#ffab40', currency: true },
  { key: 'totalRevenue',   label: 'Total Revenue',   Icon: TrendingUpIcon,           color: '#40c4ff', currency: true },
];

function StatCard({ label, value, icon, color, loading }) {
  const IconComponent = icon;
  return (
    <Paper sx={{
      p: { xs: 2, sm: 2.5 },
      height: '100%',
      position: 'relative',
      overflow: 'hidden',
      transition: 'transform 0.18s, box-shadow 0.18s, border-color 0.18s',
      '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: `0 10px 28px ${color}18`,
        borderColor: `${color}30`,
      },
      // Subtle top accent line on hover
      '&::after': {
        content: '""',
        position: 'absolute',
        top: 0, left: '20%', right: '20%',
        height: '1.5px',
        background: `linear-gradient(90deg, transparent, ${color}88, transparent)`,
        opacity: 0,
        transition: 'opacity 0.18s',
      },
      '&:hover::after': { opacity: 1 },
    }}>
      {/* Icon — top right */}
      <Box sx={{
        position: 'absolute', top: 14, right: 14,
        width: 36, height: 36, borderRadius: '10px',
        bgcolor: `${color}12`,
        border: `1px solid ${color}20`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color,
        flexShrink: 0,
      }}>
        <IconComponent sx={{ fontSize: 18 }} />
      </Box>

      {/* Label */}
      <Typography sx={{
        fontSize: '0.65rem',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        color: '#555',
        mb: 1.25,
        pr: 5, // avoid overlap with icon
      }}>
        {label}
      </Typography>

      {/* Value */}
      {loading ? (
        <Skeleton variant="text" width="60%" height={38} sx={{ mt: 0.5 }} />
      ) : (
        <Typography sx={{
          fontSize: { xs: '1.3rem', sm: '1.55rem' },
          fontWeight: 800,
          lineHeight: 1,
          color: '#efefef',
          letterSpacing: '-0.5px',
        }}>
          {value}
        </Typography>
      )}
    </Paper>
  );
}

export default function StatsCards({ stats, loading = false }) {
  return (
    <>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        mb: 1.75,
      }}>
        <AutoGraphIcon sx={{ fontSize: 18, color: '#76ff03' }} />
        <Typography variant="subtitle2" sx={{ textTransform: 'uppercase', letterSpacing: '0.08em', color: 'text.secondary' }}>
          Inventory Snapshot
        </Typography>
      </Box>
      <Grid container spacing={{ xs: 1.5, md: 2 }} sx={{ mb: 3.5 }}>
        {CARDS.map(({ key, label, Icon, color, currency }) => (
          <Grid item xs={12} sm={6} md={4} lg={2.4} key={key}>
            <StatCard
              label={label}
              icon={Icon}
              color={color}
              loading={loading}
              value={currency ? `₦${(stats[key] || 0).toLocaleString()}` : stats[key] ?? 0}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

import React from 'react';
import { Grid, Paper, Typography, Box, Skeleton } from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import SellIcon from '@mui/icons-material/Sell';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const CARDS = [
  { key: 'total',          label: 'Total',           Icon: DirectionsCarIcon,        color: '#76ff03' },
  { key: 'available',      label: 'Available',       Icon: SellIcon,                 color: '#69f0ae' },
  { key: 'sold',           label: 'Sold',            Icon: CheckCircleIcon,          color: '#f50057' },
  { key: 'inventoryValue', label: 'Stock Value',     Icon: AccountBalanceWalletIcon, color: '#ffab40', currency: true },
  { key: 'totalRevenue',   label: 'Revenue',         Icon: TrendingUpIcon,           color: '#40c4ff', currency: true },
];

function StatCard({ label, value, Icon, color, loading }) {
  return (
    <Paper sx={{
      p: { xs: 1.75, sm: 2.5 },
      height: '100%',
      position: 'relative',
      overflow: 'hidden',
      transition: 'transform 0.18s, box-shadow 0.18s, border-color 0.18s',
      '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: `0 10px 28px ${color}18`,
        borderColor: `${color}28`,
      },
      '&::after': {
        content: '""',
        position: 'absolute',
        top: 0, left: '15%', right: '15%',
        height: '1.5px',
        background: `linear-gradient(90deg, transparent, ${color}77, transparent)`,
        opacity: 0,
        transition: 'opacity 0.18s',
      },
      '&:hover::after': { opacity: 1 },
    }}>
      {/* Icon — top right, smaller on mobile */}
      <Box sx={{
        position: 'absolute',
        top: { xs: 10, sm: 14 },
        right: { xs: 10, sm: 14 },
        width: { xs: 28, sm: 36 },
        height: { xs: 28, sm: 36 },
        borderRadius: '9px',
        bgcolor: `${color}12`,
        border: `1px solid ${color}28`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color, flexShrink: 0,
      }}>
        <Icon sx={{ fontSize: { xs: 14, sm: 17 } }} />
      </Box>

      {/* Label — shorter on mobile via CARDS data */}
      <Typography sx={{
        fontSize: '0.62rem',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.09em',
        color: 'text.secondary',
        mb: { xs: 1, sm: 1.5 },
        pr: { xs: 4, sm: 5 },
        lineHeight: 1.2,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }}>
        {label}
      </Typography>

      {/* Value */}
      {loading ? (
        <Skeleton variant="text" width="55%" height={32} />
      ) : (
        <Typography sx={{
          fontSize: { xs: '1.2rem', sm: '1.6rem' },
          fontWeight: 800,
          lineHeight: 1,
          color: '#efefef',
          letterSpacing: '-0.03em',
          // Prevent overflow on very narrow cards
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}>
          {value}
        </Typography>
      )}
    </Paper>
  );
}

export default function StatsCards({ stats, loading = false }) {
  return (
    <Grid container spacing={{ xs: 1.25, sm: 2 }} sx={{ mb: { xs: 2.5, sm: 3 } }}>
      {CARDS.map(({ key, label, Icon, color, currency }) => (
        <Grid item xs={6} sm={4} md={4} lg={2.4} key={key}>
          <StatCard
            label={label}
            Icon={Icon}
            color={color}
            loading={loading}
            value={currency ? `₦${(stats[key] || 0).toLocaleString()}` : stats[key] ?? 0}
          />
        </Grid>
      ))}
    </Grid>
  );
}

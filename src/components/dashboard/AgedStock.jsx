import React from 'react';
import { Paper, Typography, Box, Chip } from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const daysInStock = (createdAt) => {
  if (!createdAt?.toDate) return 0;
  return Math.floor((Date.now() - createdAt.toDate().getTime()) / 86400000);
};

const badge = (days) => {
  if (days > 90) return { color: '#f50057', bg: 'rgba(245,0,87,0.1)', border: 'rgba(245,0,87,0.2)' };
  if (days > 60) return { color: '#ffab40', bg: 'rgba(255,171,64,0.1)', border: 'rgba(255,171,64,0.2)' };
  return { color: '#fff176', bg: 'rgba(255,241,118,0.08)', border: 'rgba(255,241,118,0.15)' };
};

export default function AgedStock({ cars }) {
  const aged = cars
    .filter(c => c.status === 'For Sale')
    .map(c => ({ ...c, days: daysInStock(c.createdAt) }))
    .filter(c => c.days > 30)
    .sort((a, b) => b.days - a.days);

  return (
    <Paper sx={{ p: 3, borderRadius: 3, height: '100%', border: aged.length > 0 ? '1px solid rgba(255,171,64,0.15)' : '1px solid rgba(255,255,255,0.06)' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2.5 }}>
        <WarningAmberIcon sx={{ color: aged.length > 0 ? '#ffab40' : '#444', fontSize: 18 }} />
        <Typography variant="h6" sx={{ lineHeight: 1 }}>Aged Stock</Typography>
        {aged.length > 0 && (
          <Chip
            label={`${aged.length} car${aged.length > 1 ? 's' : ''}`}
            size="small"
            sx={{ bgcolor: 'rgba(255,171,64,0.1)', color: '#ffab40', fontWeight: 700, border: '1px solid rgba(255,171,64,0.2)' }}
          />
        )}
      </Box>

      {aged.length === 0 ? (
        /* Empty state */
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <CheckCircleOutlineIcon sx={{ fontSize: 36, color: '#2a2a2a', mb: 1.5 }} />
          <Typography sx={{ fontWeight: 600, color: '#444', fontSize: '0.85rem', mb: 0.5 }}>
            All stock is fresh
          </Typography>
          <Typography variant="caption" sx={{ color: '#333' }}>
            No vehicles have been in stock over 30 days.
          </Typography>
        </Box>
      ) : (
        <>
          <Typography variant="caption" sx={{ color: '#555', display: 'block', mb: 2.5, lineHeight: 1.6 }}>
            These vehicles have been in stock over 30 days. Consider reviewing pricing.
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {aged.slice(0, 7).map(car => {
              const { color, bg, border } = badge(car.days);
              return (
                <Box key={car.id} sx={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  p: 1.5, borderRadius: 2,
                  bgcolor: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.04)',
                  transition: 'background 0.15s',
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.04)' },
                }}>
                  <Box sx={{ minWidth: 0 }}>
                    <Typography sx={{ fontWeight: 700, fontSize: '0.82rem', color: '#d0d0d0', lineHeight: 1.2 }}>
                      {car.brand} {car.model}
                    </Typography>
                    <Typography sx={{ fontSize: '0.72rem', color: '#555', mt: 0.25 }}>
                      ₦{car.price?.toLocaleString()} · {car.condition}
                    </Typography>
                  </Box>
                  <Box sx={{
                    px: 1.25, py: 0.4, borderRadius: '6px',
                    bgcolor: bg, border: `1px solid ${border}`,
                    flexShrink: 0, ml: 1.5,
                  }}>
                    <Typography sx={{ fontSize: '0.68rem', fontWeight: 800, color, lineHeight: 1 }}>
                      {car.days}d
                    </Typography>
                  </Box>
                </Box>
              );
            })}
          </Box>

          {aged.length > 7 && (
            <Typography variant="caption" sx={{ color: '#444', mt: 2, display: 'block', textAlign: 'center' }}>
              +{aged.length - 7} more vehicles
            </Typography>
          )}
        </>
      )}
    </Paper>
  );
}

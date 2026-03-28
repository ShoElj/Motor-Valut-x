import React, { useState } from 'react';
import {
  Paper, Typography, Box, Table, TableHead, TableRow, TableCell,
  TableBody, TableContainer, Chip, TextField, InputAdornment, Grid
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';

export default function SalesHistory({ cars }) {
  const [search, setSearch] = useState('');
  const sold = cars
    .filter(c => c.status === 'Sold')
    .filter(c => !search || `${c.brand} ${c.model}`.toLowerCase().includes(search.toLowerCase()));

  const totalRevenue = sold.reduce((s, c) => s + (c.price || 0), 0);
  const totalProfit = sold.reduce((s, c) => s + ((c.price || 0) - (c.costPrice || 0)), 0);
  const averageSale = sold.length ? Math.round(totalRevenue / sold.length) : 0;

  return (
    <Paper sx={{ p: 3, borderRadius: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2.5, flexWrap: 'wrap', gap: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ width: 3, height: 20, bgcolor: 'secondary.main', borderRadius: 2 }} />
          <Typography variant="h6">Sales History</Typography>
          <Chip label={`${sold.length} sold`} size="small" sx={{ bgcolor: 'rgba(245,0,87,0.12)', color: 'secondary.main', fontWeight: 600 }} />
        </Box>
      </Box>

      <Grid container spacing={1.5} sx={{ mb: 2.25 }}>
        {[
          { label: 'Total Revenue', value: `₦${totalRevenue.toLocaleString()}`, color: '#69f0ae' },
          { label: 'Total Profit', value: `₦${totalProfit.toLocaleString()}`, color: '#76ff03' },
          { label: 'Average Sale', value: `₦${averageSale.toLocaleString()}`, color: '#40c4ff' },
        ].map((item) => (
          <Grid item xs={12} sm={4} key={item.label}>
            <Box sx={{ p: 1.75, borderRadius: 2, border: '1px solid rgba(255,255,255,0.06)', bgcolor: 'rgba(255,255,255,0.02)' }}>
              <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 0.4 }}>{item.label}</Typography>
              <Typography sx={{ fontWeight: 800, color: item.color, fontSize: '1.02rem', lineHeight: 1.1 }}>{item.value}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>

      <TextField
        size="small" placeholder="Search sold cars…" value={search}
        onChange={e => setSearch(e.target.value)} sx={{ mb: 2.25, width: { xs: '100%', sm: 280 } }}
        InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ fontSize: 16, color: '#555' }} /></InputAdornment> }}
      />

      {sold.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 6 }}>
          <ReceiptLongIcon sx={{ fontSize: 34, color: 'rgba(255,255,255,0.2)', mb: 1 }} />
          <Typography variant="subtitle2" sx={{ color: '#d0d0d0', mb: 0.5 }}>No sales recorded yet</Typography>
          <Typography variant="body2" color="text.secondary">Cars marked as sold will appear here with buyer and profit details.</Typography>
        </Box>
      ) : (
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Vehicle</TableCell>
                <TableCell>Buyer</TableCell>
                <TableCell>Sold Date</TableCell>
                <TableCell align="right">Sale Price</TableCell>
                <TableCell align="right">Cost</TableCell>
                <TableCell align="right">Profit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sold.map(car => {
                const profit = (car.price || 0) - (car.costPrice || 0);
                const soldDate = car.soldAt?.toDate ? car.soldAt.toDate().toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' }) : '—';
                return (
                  <TableRow key={car.id}>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 700 }}>{car.brand} {car.model}</Typography>
                      <Typography variant="caption" color="text.secondary">{car.year}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{car.buyerName || <span style={{ color: '#555' }}>—</span>}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">{soldDate}</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>₦{car.price?.toLocaleString()}</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2" color="text.secondary">
                        {car.costPrice ? `₦${car.costPrice.toLocaleString()}` : '—'}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2" sx={{ fontWeight: 700, color: profit > 0 ? '#76ff03' : profit < 0 ? '#f50057' : 'inherit' }}>
                        {car.costPrice ? `₦${profit.toLocaleString()}` : '—'}
                      </Typography>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Paper>
  );
}

import React, { useState } from 'react';
import {
  Paper, Typography, Box, Table, TableHead, TableRow, TableCell,
  TableBody, TableContainer, Chip, TextField, InputAdornment
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function SalesHistory({ cars }) {
  const [search, setSearch] = useState('');
  const sold = cars
    .filter(c => c.status === 'Sold')
    .filter(c => !search || `${c.brand} ${c.model}`.toLowerCase().includes(search.toLowerCase()));

  const totalRevenue = sold.reduce((s, c) => s + (c.price || 0), 0);
  const totalProfit = sold.reduce((s, c) => s + ((c.price || 0) - (c.costPrice || 0)), 0);

  return (
    <Paper sx={{ p: 3, borderRadius: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3, flexWrap: 'wrap', gap: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ width: 3, height: 20, bgcolor: 'secondary.main', borderRadius: 2 }} />
          <Typography variant="h6">Sales History</Typography>
          <Chip label={`${sold.length} sold`} size="small" sx={{ bgcolor: 'rgba(245,0,87,0.12)', color: 'secondary.main', fontWeight: 600 }} />
        </Box>
        <Box sx={{ display: 'flex', gap: 3 }}>
          <Box sx={{ textAlign: 'right' }}>
            <Typography variant="caption" sx={{ color: '#555', display: 'block' }}>Total Revenue</Typography>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#69f0ae' }}>₦{totalRevenue.toLocaleString()}</Typography>
          </Box>
          <Box sx={{ textAlign: 'right' }}>
            <Typography variant="caption" sx={{ color: '#555', display: 'block' }}>Total Profit</Typography>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#76ff03' }}>₦{totalProfit.toLocaleString()}</Typography>
          </Box>
        </Box>
      </Box>

      <TextField
        size="small" placeholder="Search sold cars…" value={search}
        onChange={e => setSearch(e.target.value)} sx={{ mb: 2, width: 260 }}
        InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ fontSize: 16, color: '#555' }} /></InputAdornment> }}
      />

      {sold.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 5 }}>
          <Typography variant="body2" color="text.secondary">No sales recorded yet.</Typography>
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

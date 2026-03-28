import React from 'react';
import { Grid, TextField, FormControl, InputLabel, Select, MenuItem, Box, Button, Typography } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import FilterListOffIcon from '@mui/icons-material/FilterListOff';

const EMPTY = {};

export default function Filters({ filters, onChange, brands }) {
  const set = (key) => (e) => onChange({ ...filters, [key]: e.target.value });
  const hasFilters = Object.values(filters).some(v => v !== '' && v !== undefined);

  return (
    <Box sx={{
      mb: 3, p: { xs: 1.75, sm: 2.25 }, borderRadius: 2,
      bgcolor: 'rgba(255,255,255,0.02)',
      border: '1px solid rgba(255,255,255,0.05)',
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography sx={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#444' }}>
          Filters
        </Typography>
        {hasFilters && (
          <Button size="small" startIcon={<FilterListOffIcon sx={{ fontSize: 13 }} />}
            onClick={() => onChange(EMPTY)}
            sx={{ fontSize: '0.72rem', color: '#666', py: 0.4, minHeight: 'unset', '&:hover': { color: '#f50057' } }}>
            Clear
          </Button>
        )}
      </Box>
      <Grid container spacing={1.75}>
        <Grid item xs={12} sm={6} md={3}>
          <TextField fullWidth label="Search brand, model, VIN"
            value={filters.search || ''} onChange={set('search')}
            InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ fontSize: 15, color: '#444' }} /></InputAdornment> }}
          />
        </Grid>
        <Grid item xs={6} sm={3} md={2}>
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select value={filters.status || ''} label="Status" onChange={set('status')}>
              <MenuItem value="">All</MenuItem>
              <MenuItem value="For Sale">For Sale</MenuItem>
              <MenuItem value="Sold">Sold</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6} sm={3} md={2}>
          <FormControl fullWidth>
            <InputLabel>Condition</InputLabel>
            <Select value={filters.condition || ''} label="Condition" onChange={set('condition')}>
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Brand New">Brand New</MenuItem>
              <MenuItem value="Tokunbo">Tokunbo</MenuItem>
              <MenuItem value="Nigerian Used">Nigerian Used</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6} sm={3} md={2}>
          <FormControl fullWidth>
            <InputLabel>Brand</InputLabel>
            <Select value={filters.brand || ''} label="Brand" onChange={set('brand')}>
              <MenuItem value="">All</MenuItem>
              {brands.map(b => <MenuItem key={b} value={b}>{b}</MenuItem>)}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6} sm={3} md={1.5}>
          <TextField fullWidth label="Min ₦" type="number" value={filters.minPrice || ''} onChange={set('minPrice')} />
        </Grid>
        <Grid item xs={6} sm={3} md={1.5}>
          <TextField fullWidth label="Max ₦" type="number" value={filters.maxPrice || ''} onChange={set('maxPrice')} />
        </Grid>
      </Grid>
    </Box>
  );
}

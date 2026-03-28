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
    <Box sx={{ mb: 2.5 }}>
      {/* Only show the label row when filters are active — reduces visual noise otherwise */}
      {hasFilters && (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.25 }}>
          <Typography sx={{
            fontSize: '0.62rem', fontWeight: 700,
            textTransform: 'uppercase', letterSpacing: '0.1em',
            color: '#444',
          }}>
            Filters active
          </Typography>
          <Button
            size="small"
            startIcon={<FilterListOffIcon sx={{ fontSize: 12 }} />}
            onClick={() => onChange(EMPTY)}
            sx={{
              fontSize: '0.7rem', color: '#555',
              py: 0.25, minHeight: 'unset',
              '&:hover': { color: '#f50057' },
            }}
          >
            Clear all
          </Button>
        </Box>
      )}

      <Grid container spacing={{ xs: 1.25, sm: 1.5 }}>
        {/* Search — full width on mobile */}
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            label="Search brand, model, VIN"
            value={filters.search || ''}
            onChange={set('search')}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ fontSize: 14, color: '#444' }} />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        {/* Status + Condition side by side on mobile */}
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

        {/* Brand */}
        <Grid item xs={6} sm={3} md={2}>
          <FormControl fullWidth>
            <InputLabel>Brand</InputLabel>
            <Select value={filters.brand || ''} label="Brand" onChange={set('brand')}>
              <MenuItem value="">All</MenuItem>
              {brands.map(b => <MenuItem key={b} value={b}>{b}</MenuItem>)}
            </Select>
          </FormControl>
        </Grid>

        {/* Price range */}
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

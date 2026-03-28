import React, { useMemo } from 'react';
import { Paper, Typography, Box, useMediaQuery } from '@mui/material';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar,
} from 'recharts';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import darkTheme from '../../theme';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <Box sx={{
      bgcolor: '#1c1c1c',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: 2, p: 1.5,
      boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
    }}>
      <Typography sx={{ fontSize: '0.7rem', color: '#666', mb: 0.75, fontWeight: 600 }}>{label}</Typography>
      {payload.map(p => (
        <Typography key={p.name} sx={{ fontSize: '0.78rem', color: p.color, fontWeight: 700 }}>
          {p.name === 'Revenue' ? `₦${Number(p.value).toLocaleString()}` : `${p.value} sold`}
        </Typography>
      ))}
    </Box>
  );
};

function EmptyChartState() {
  return (
    <Box sx={{
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      py: { xs: 5, sm: 7 },
    }}>
      <Box sx={{
        width: 52, height: 52, borderRadius: '14px',
        bgcolor: 'rgba(118,255,3,0.07)',
        border: '1px solid rgba(118,255,3,0.14)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        mb: 2,
      }}>
        <TrendingUpIcon sx={{ fontSize: 24, color: 'rgba(118,255,3,0.5)' }} />
      </Box>
      <Typography sx={{ fontWeight: 600, color: '#555', fontSize: '0.88rem', mb: 0.5 }}>
        No sales data yet
      </Typography>
      <Typography variant="caption" sx={{ color: '#3a3a3a', textAlign: 'center', maxWidth: 220, lineHeight: 1.6 }}>
        Mark cars as sold to start seeing revenue trends here.
      </Typography>
    </Box>
  );
}

export default function RevenueChart({ cars }) {
  const isMobile = useMediaQuery(darkTheme.breakpoints.down('sm'));

  const { chartData, totalRevenue, totalSold } = useMemo(() => {
    const now = new Date();
    const months = Array.from({ length: 6 }, (_, i) => {
      const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
      return { month: MONTHS[d.getMonth()], year: d.getFullYear(), monthIndex: d.getMonth(), revenue: 0, sold: 0 };
    });

    cars.filter(c => c.status === 'Sold' && c.soldAt?.toDate).forEach(car => {
      const d = car.soldAt.toDate();
      const entry = months.find(m => m.monthIndex === d.getMonth() && m.year === d.getFullYear());
      if (entry) { entry.revenue += car.price || 0; entry.sold += 1; }
    });

    const data = months.map(m => ({ name: m.month, Revenue: m.revenue, Sold: m.sold }));
    return {
      chartData: data,
      totalRevenue: data.reduce((s, m) => s + m.Revenue, 0),
      totalSold: data.reduce((s, m) => s + m.Sold, 0),
    };
  }, [cars]);

  const hasData = totalSold > 0;

  const yFormatter = v =>
    v >= 1000000 ? `₦${(v / 1000000).toFixed(1)}M`
    : v >= 1000   ? `₦${(v / 1000).toFixed(0)}K`
    : `₦${v}`;

  return (
    <Paper sx={{ p: { xs: 2, sm: 3 }, borderRadius: 3 }}>
      {/* Header */}
      <Box sx={{
        display: 'flex', alignItems: 'flex-start',
        justifyContent: 'space-between',
        mb: hasData ? 3 : 2,
        flexWrap: 'wrap', gap: 1.5,
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ width: 3, height: 18, bgcolor: '#76ff03', borderRadius: 2 }} />
          <Box>
            <Typography variant="h6" sx={{ lineHeight: 1, fontSize: '0.95rem' }}>Revenue Trend</Typography>
            <Typography variant="caption" sx={{ color: '#555' }}>Last 6 months</Typography>
          </Box>
        </Box>

        {/* Summary — only show when there's data */}
        {hasData && (
          <Box sx={{ display: 'flex', gap: { xs: 1.5, sm: 2.5 } }}>
            <Box sx={{ textAlign: 'right' }}>
              <Typography sx={{ fontSize: '0.62rem', color: '#555', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>
                Revenue
              </Typography>
              <Typography sx={{ fontSize: { xs: '0.95rem', sm: '1.1rem' }, fontWeight: 800, color: '#76ff03', lineHeight: 1.2 }}>
                ₦{totalRevenue.toLocaleString()}
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'right' }}>
              <Typography sx={{ fontSize: '0.62rem', color: '#555', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>
                Sold
              </Typography>
              <Typography sx={{ fontSize: { xs: '0.95rem', sm: '1.1rem' }, fontWeight: 800, color: '#f50057', lineHeight: 1.2 }}>
                {totalSold}
              </Typography>
            </Box>
          </Box>
        )}
      </Box>

      {/* Charts or zero-state */}
      {!hasData ? (
        <EmptyChartState />
      ) : (
        <>
          {/* Area chart */}
          <ResponsiveContainer width="100%" height={isMobile ? 180 : 240}>
            <AreaChart data={chartData} margin={{ top: 8, right: 4, left: isMobile ? -20 : 4, bottom: 0 }}>
              <defs>
                <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%"   stopColor="#76ff03" stopOpacity={0.16} />
                  <stop offset="100%" stopColor="#76ff03" stopOpacity={0}    />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
              <XAxis dataKey="name" tick={{ fill: '#555', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#555', fontSize: 10 }} axisLine={false} tickLine={false}
                tickFormatter={yFormatter} width={isMobile ? 36 : 56} />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.05)', strokeWidth: 1 }} />
              <Area type="monotone" dataKey="Revenue" stroke="#76ff03" strokeWidth={2}
                fill="url(#revenueGrad)"
                dot={{ fill: '#76ff03', r: 3, strokeWidth: 0 }}
                activeDot={{ r: 5, fill: '#76ff03', strokeWidth: 0 }} />
            </AreaChart>
          </ResponsiveContainer>

          <Box sx={{ borderTop: '1px solid rgba(255,255,255,0.05)', my: { xs: 2, sm: 3 } }} />

          {/* Bar chart */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.75 }}>
            <Box sx={{ width: 3, height: 14, bgcolor: '#f50057', borderRadius: 2 }} />
            <Typography sx={{ fontWeight: 600, fontSize: '0.82rem', color: '#bbb' }}>
              Cars Sold per Month
            </Typography>
          </Box>
          <ResponsiveContainer width="100%" height={isMobile ? 120 : 160}>
            <BarChart data={chartData} margin={{ top: 4, right: 4, left: isMobile ? -20 : 4, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
              <XAxis dataKey="name" tick={{ fill: '#555', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#555', fontSize: 10 }} axisLine={false} tickLine={false}
                allowDecimals={false} width={isMobile ? 20 : 28} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.025)' }} />
              <Bar dataKey="Sold" fill="#f50057" radius={[4, 4, 0, 0]} maxBarSize={36} />
            </BarChart>
          </ResponsiveContainer>
        </>
      )}
    </Paper>
  );
}

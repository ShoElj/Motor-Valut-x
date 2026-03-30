import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';

import { Box, Button, TextField, Typography, Container, Paper, Alert, ThemeProvider, CssBaseline, CircularProgress } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import darkTheme from '../theme';

function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch {
      setError('Failed to sign in. Please check your email and password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: 'url(https://images.unsplash.com/photo-1553440569-bcc63803a83d?q=80&w=1925&auto=format&fit=crop)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
        <Container component="main" maxWidth="xs">
          <Paper sx={{
            p: 4,
            borderRadius: 3,
            backdropFilter: 'blur(16px)',
            backgroundColor: 'rgba(10,10,10,0.75)',
            border: '1px solid rgba(255,255,255,0.1)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
            <Box sx={{
              width: 48, height: 48, borderRadius: '14px',
              bgcolor: 'rgba(118,255,3,0.1)',
              border: '1px solid rgba(118,255,3,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              mb: 2,
            }}>
              <LockOutlinedIcon sx={{ fontSize: 22, color: 'primary.main' }} />
            </Box>

            <Typography component="h1" variant="h5" sx={{ fontWeight: 800, letterSpacing: '-0.3px', mb: 0.5 }}>
              Motor<span style={{ color: darkTheme.palette.primary.main }}>Vault</span>
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Admin Panel
            </Typography>

            <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
              <TextField
                margin="normal" required fullWidth
                label="Email Address" autoComplete="email" autoFocus
                value={email} onChange={e => setEmail(e.target.value)}
              />
              <TextField
                margin="normal" required fullWidth
                label="Password" type="password" autoComplete="current-password"
                value={password} onChange={e => setPassword(e.target.value)}
              />

              {error && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {error}
                </Alert>
              )}

              <Button
                type="submit" fullWidth variant="contained"
                disabled={loading}
                sx={{ mt: 3, mb: 1, py: 1.4, fontWeight: 700, color: '#000' }}
              >
                {loading ? <CircularProgress size={20} sx={{ color: '#000' }} /> : 'Sign In'}
              </Button>
            </Box>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default AdminLogin;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/config';
import { signInWithEmailAndPassword } from 'firebase/auth';

// Import Material UI components and styling tools
import { Box, Button, TextField, Typography, Container, Paper, Alert, createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

// A custom dark theme to match the dashboard
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#76ff03', // Updated to the vibrant green
    },
    background: {
      default: '#121212',
      paper: 'rgba(0, 0, 0, 0.4)',
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.3)',
            },
            '&:hover fieldset': {
              borderColor: '#76ff03', // Updated hover color
            },
          },
        },
      },
    },
  },
});

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
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (err) {
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
          <Paper elevation={12} sx={{
            padding: 4,
            borderRadius: 4,
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
            <LockOutlinedIcon sx={{ fontSize: 40, mb: 1, color: 'primary.main' }} />
            <Typography component="h1" variant="h4" sx={{ fontWeight: 'bold' }}>
              Motor<span style={{ color: darkTheme.palette.primary.main }}>Vault</span> {/* Updated to use theme color */}
            </Typography>
            <Typography component="h2" variant="subtitle1" sx={{ color: 'rgba(255, 255, 255, 0.7)', mt: 1 }}>
              Admin Panel
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, width: '100%' }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && <Alert severity="error" sx={{ mt: 2, width: '100%', bgcolor: 'rgba(211, 47, 47, 0.25)' }}>{error}</Alert>}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                sx={{ 
                  mt: 3, 
                  mb: 2, 
                  py: 1.5, 
                  fontSize: '1rem', 
                  fontWeight: 'bold', 
                  bgcolor: 'primary.main', 
                  color: '#000', 
                  '&:hover': { bgcolor: '#9cff57' } // Lighter green on hover
                }}
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </Button>
            </Box>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default AdminLogin;

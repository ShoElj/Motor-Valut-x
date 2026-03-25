import { createTheme } from '@mui/material';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#76ff03' },
    secondary: { main: '#f50057' },
    background: { default: '#121212', paper: '#1e1e1e' },
    success: { main: '#69f0ae' },
    warning: { main: '#ffab40' },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h2: { fontWeight: 700 },
    h3: { fontWeight: 700 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
  },
});

export default darkTheme;

import { createTheme, alpha } from '@mui/material';

// ─── Design tokens ────────────────────────────────────────────────────────────
// Centralised so every component override references the same values.

const GREEN   = '#76ff03';
const RED     = '#f50057';
const TEAL    = '#69f0ae';
const AMBER   = '#ffab40';
const BLUE    = '#40c4ff';

// Surface stack — each level is slightly lighter than the one below
const BG_BASE    = '#0a0a0a';   // page background
const BG_PAPER   = '#141414';   // default card / paper
const BG_RAISED  = '#1a1a1a';   // elevated card (dialogs, popovers)
const BG_INSET   = '#0e0e0e';   // recessed surface (table rows, code blocks)

const BORDER_SOFT   = 'rgba(255,255,255,0.06)';
const BORDER_MEDIUM = 'rgba(255,255,255,0.10)';
const BORDER_FOCUS  = GREEN;
const BORDER_STRONG = 'rgba(255,255,255,0.14)';

const TEXT_PRIMARY   = '#efefef';
const TEXT_SECONDARY = '#a0a0a0';
const TEXT_MUTED     = '#757575';
const TEXT_FAINT     = '#333';

const RADIUS_SM = 8;
const RADIUS_MD = 12;
const RADIUS_LG = 14;
const RADIUS_XL = 16;
const SHADOW_SOFT = '0 8px 22px rgba(0,0,0,0.22)';
const SHADOW_FLOAT = '0 12px 28px rgba(0,0,0,0.32)';

// ─── Theme ────────────────────────────────────────────────────────────────────

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary:    { main: GREEN,  contrastText: '#000' },
    secondary:  { main: RED },
    success:    { main: TEAL },
    warning:    { main: AMBER },
    info:       { main: BLUE },
    background: { default: BG_BASE, paper: BG_PAPER },
    divider:    BORDER_SOFT,
    text: {
      primary:   TEXT_PRIMARY,
      secondary: TEXT_SECONDARY,
      disabled:  TEXT_MUTED,
    },
  },

  shape: { borderRadius: RADIUS_MD },
  spacing: 8,

  // ── Typography ──────────────────────────────────────────────────────────────
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", sans-serif',

    h1: { fontWeight: 800, letterSpacing: '-1px',   lineHeight: 1.05 },
    h2: { fontWeight: 800, letterSpacing: '-0.5px', lineHeight: 1.1  },
    h3: { fontWeight: 700, letterSpacing: '-0.5px', lineHeight: 1.15 },
    h4: { fontWeight: 700, letterSpacing: '-0.25px' },
    h5: { fontWeight: 700 },
    h6: { fontWeight: 600 },

    subtitle1: { fontWeight: 600, fontSize: '0.95rem', lineHeight: 1.4 },
    subtitle2: { fontWeight: 600, fontSize: '0.82rem', color: TEXT_SECONDARY },

    body1: { fontSize: '0.95rem', lineHeight: 1.7, color: TEXT_PRIMARY },
    body2: { fontSize: '0.875rem', lineHeight: 1.65, color: TEXT_SECONDARY },

    caption: {
      fontSize: '0.72rem',
      letterSpacing: '0.03em',
      lineHeight: 1.5,
      color: TEXT_MUTED,
    },

    overline: {
      fontSize: '0.68rem',
      fontWeight: 700,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: TEXT_MUTED,
    },
    button: {
      fontWeight: 600,
      letterSpacing: '0.02em',
      textTransform: 'none',
    },
  },

  // ── Component overrides ─────────────────────────────────────────────────────
  components: {

    // Global baseline
    MuiCssBaseline: {
      styleOverrides: {
        '*, *::before, *::after': { boxSizing: 'border-box' },
        'html, body, #root': { height: '100%', margin: 0, padding: 0 },
        body: {
          backgroundColor: BG_BASE,
          color: TEXT_PRIMARY,
          fontFamily: '"Inter", "Roboto", "Helvetica", sans-serif',
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
        },
        // Thin scrollbar
        '*': { scrollbarWidth: 'thin', scrollbarColor: '#252525 transparent' },
        '*::-webkit-scrollbar': { width: 5, height: 5 },
        '*::-webkit-scrollbar-track': { background: 'transparent' },
        '*::-webkit-scrollbar-thumb': {
          background: '#252525',
          borderRadius: 4,
          '&:hover': { background: '#333' },
        },
        // Remove number input spinners
        'input[type=number]::-webkit-inner-spin-button, input[type=number]::-webkit-outer-spin-button': {
          WebkitAppearance: 'none',
          margin: 0,
        },
        'input[type=number]': { MozAppearance: 'textfield' },
      },
    },

    // ── Paper / Card surface ─────────────────────────────────────────────────
    MuiPaper: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: BG_PAPER,
          border: `1px solid ${BORDER_SOFT}`,
          borderRadius: RADIUS_LG,
          boxShadow: SHADOW_SOFT,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: RADIUS_LG,
          border: `1px solid ${BORDER_SOFT}`,
          backgroundImage: 'none',
          boxShadow: 'none',
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: 20,
          '&:last-child': { paddingBottom: 20 },
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          padding: '18px 20px 10px',
        },
        title: {
          fontWeight: 700,
          letterSpacing: '-0.01em',
        },
        subheader: {
          color: TEXT_SECONDARY,
        },
      },
    },

    // ── Buttons ──────────────────────────────────────────────────────────────
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          fontWeight: 600,
          borderRadius: RADIUS_MD,
          letterSpacing: '0.01em',
          transition: 'all 0.18s ease',
          minHeight: 36,
          paddingInline: 16,
        },
        sizeSmall:  { fontSize: '0.78rem', padding: '5px 12px',  minHeight: 30 },
        sizeMedium: { fontSize: '0.85rem', padding: '7px 16px',  minHeight: 36 },
        sizeLarge:  { fontSize: '0.92rem', padding: '10px 24px', minHeight: 44 },

        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: `0 0 18px ${alpha(GREEN, 0.22)}`,
            transform: 'translateY(-1px)',
          },
          '&:active': { transform: 'translateY(0)', boxShadow: 'none' },
          '&.Mui-disabled': { opacity: 0.45 },
        },
        containedPrimary: {
          background: `linear-gradient(180deg, ${alpha(GREEN, 0.88)} 0%, ${alpha(GREEN, 0.78)} 100%)`,
          color: '#051102',
          boxShadow: `0 8px 20px ${alpha(GREEN, 0.2)}`,
          '&:hover': {
            background: `linear-gradient(180deg, ${alpha(GREEN, 0.92)} 0%, ${alpha(GREEN, 0.82)} 100%)`,
            boxShadow: `0 10px 22px ${alpha(GREEN, 0.24)}`,
          },
        },
        outlined: {
          borderColor: BORDER_MEDIUM,
          backgroundColor: alpha('#fff', 0.01),
          '&:hover': {
            borderColor: GREEN,
            backgroundColor: alpha(GREEN, 0.05),
          },
        },
        text: {
          color: TEXT_SECONDARY,
          '&:hover': {
            backgroundColor: 'rgba(255,255,255,0.04)',
            color: TEXT_PRIMARY,
          },
        },
      },
    },

    // ── Icon buttons ─────────────────────────────────────────────────────────
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: RADIUS_SM,
          border: `1px solid ${alpha('#fff', 0.08)}`,
          backgroundColor: alpha('#fff', 0.02),
          transition: 'background 0.14s, color 0.14s, border-color 0.14s',
          '&:hover': {
            backgroundColor: 'rgba(255,255,255,0.07)',
            borderColor: alpha(GREEN, 0.45),
          },
          '&.Mui-disabled': { opacity: 0.35 },
        },
        sizeSmall:  { padding: 6 },
        sizeMedium: { padding: 8 },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          borderRadius: RADIUS_SM,
          backgroundColor: alpha('#fff', 0.03),
          border: `1px solid ${alpha('#fff', 0.08)}`,
          color: TEXT_SECONDARY,
          width: 32,
          height: 32,
          fontSize: '0.9rem',
        },
      },
    },

    // ── Text fields ──────────────────────────────────────────────────────────
    MuiTextField: {
      defaultProps: { size: 'small', variant: 'outlined' },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: RADIUS_SM,
          fontSize: '0.875rem',
          '& fieldset': { borderColor: 'rgba(255,255,255,0.09)', transition: 'border-color 0.15s' },
          '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
          '&.Mui-focused fieldset': { borderColor: BORDER_FOCUS, borderWidth: '1.5px' },
          '&.Mui-error fieldset': { borderColor: RED },
          '&.Mui-disabled': { opacity: 0.5 },
        },
        input: { padding: '8px 12px' },
        inputSizeSmall: { padding: '7px 12px' },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: '0.82rem',
          color: TEXT_MUTED,
          '&.Mui-focused': { color: GREEN },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: { borderRadius: RADIUS_SM, fontSize: '0.875rem' },
        select: { padding: '7px 12px' },
      },
    },
    MuiFormControl: {
      defaultProps: { size: 'small' },
    },

    // ── Table ────────────────────────────────────────────────────────────────
    MuiTableHead: {
      styleOverrides: {
        root: {
          '& .MuiTableCell-root': {
            fontWeight: 700,
            fontSize: '0.67rem',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: TEXT_MUTED,
            borderBottom: `1px solid ${BORDER_SOFT}`,
            paddingTop: 10,
            paddingBottom: 10,
            paddingLeft: 16,
            paddingRight: 16,
            backgroundColor: BG_INSET,
          },
        },
      },
    },
    MuiTableBody: {
      styleOverrides: {
        root: {
          '& .MuiTableRow-root': {
            transition: 'background 0.12s',
            '&:hover': { backgroundColor: 'rgba(255,255,255,0.022)' },
          },
          '& .MuiTableCell-root': {
            borderBottom: `1px solid rgba(255,255,255,0.035)`,
            paddingTop: 13,
            paddingBottom: 13,
            paddingLeft: 16,
            paddingRight: 16,
            fontSize: '0.875rem',
          },
        },
      },
    },
    MuiTableContainer: {
      styleOverrides: {
        root: { borderRadius: RADIUS_MD, overflow: 'hidden' },
      },
    },

    // ── Chip ─────────────────────────────────────────────────────────────────
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          fontSize: '0.68rem',
          borderRadius: RADIUS_SM,
          height: 22,
          letterSpacing: '0.02em',
        },
        label: { paddingLeft: 8, paddingRight: 8 },
      },
    },

    // ── Dialog ───────────────────────────────────────────────────────────────
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundImage: 'none',
          backgroundColor: BG_RAISED,
          border: `1px solid ${BORDER_STRONG}`,
          borderRadius: RADIUS_XL,
          boxShadow: SHADOW_FLOAT,
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          fontSize: '1rem',
          fontWeight: 700,
          paddingBottom: 8,
          color: TEXT_PRIMARY,
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: { paddingTop: '12px !important' },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: { padding: '12px 20px 16px', gap: 8 },
      },
    },

    // ── Drawer ───────────────────────────────────────────────────────────────
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundImage: 'none',
          backgroundColor: '#0e0e0e',
          borderRight: `1px solid ${BORDER_SOFT}`,
        },
      },
    },

    // ── AppBar ───────────────────────────────────────────────────────────────
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: 'rgba(10,10,10,0.85)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: `1px solid ${BORDER_SOFT}`,
          boxShadow: 'none',
        },
      },
    },

    // ── Alert ────────────────────────────────────────────────────────────────
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: RADIUS_MD,
          fontSize: '0.85rem',
          alignItems: 'center',
        },
        standardSuccess: { backgroundColor: alpha(TEAL,  0.1), border: `1px solid ${alpha(TEAL,  0.25)}` },
        standardError:   { backgroundColor: alpha(RED,   0.1), border: `1px solid ${alpha(RED,   0.25)}` },
        standardWarning: { backgroundColor: alpha(AMBER, 0.1), border: `1px solid ${alpha(AMBER, 0.25)}` },
        standardInfo:    { backgroundColor: alpha(BLUE,  0.1), border: `1px solid ${alpha(BLUE,  0.25)}` },
      },
    },

    // ── Divider ──────────────────────────────────────────────────────────────
    MuiDivider: {
      styleOverrides: { root: { borderColor: BORDER_SOFT } },
    },

    // ── Tooltip ──────────────────────────────────────────────────────────────
    MuiTooltip: {
      defaultProps: { arrow: false, enterDelay: 300 },
      styleOverrides: {
        tooltip: {
          backgroundColor: '#222',
          border: `1px solid ${BORDER_MEDIUM}`,
          fontSize: '0.72rem',
          fontWeight: 500,
          borderRadius: RADIUS_SM,
          padding: '5px 10px',
          color: TEXT_PRIMARY,
          boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
        },
      },
    },

    // ── Linear progress ──────────────────────────────────────────────────────
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          backgroundColor: 'rgba(255,255,255,0.06)',
          height: 3,
        },
        bar: { borderRadius: 4, backgroundColor: GREEN },
      },
    },

    // ── Circular progress ────────────────────────────────────────────────────
    MuiCircularProgress: {
      defaultProps: { size: 20, thickness: 4 },
    },

    // ── Snackbar ─────────────────────────────────────────────────────────────
    MuiSnackbarContent: {
      styleOverrides: {
        root: {
          backgroundColor: '#222',
          border: `1px solid ${BORDER_MEDIUM}`,
          borderRadius: RADIUS_MD,
          fontSize: '0.82rem',
          color: TEXT_PRIMARY,
          boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
        },
      },
    },

    // ── List ─────────────────────────────────────────────────────────────────
    MuiListItem: {
      styleOverrides: {
        root: { borderRadius: RADIUS_SM },
      },
    },

    // ── Typography rhythm / section headings ────────────────────────────────
    MuiTypography: {
      styleOverrides: {
        root: {
          textWrap: 'pretty',
        },
        h5: {
          letterSpacing: '-0.02em',
          marginBottom: 4,
        },
        h6: {
          letterSpacing: '-0.01em',
          marginBottom: 4,
          color: TEXT_PRIMARY,
        },
        subtitle2: {
          color: TEXT_SECONDARY,
          letterSpacing: '0.02em',
        },
      },
    },
  },
});

export default darkTheme;

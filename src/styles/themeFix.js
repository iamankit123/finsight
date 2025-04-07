// New theme file with cleaner exports and structure

// Common theme settings
const commonTheme = {
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 500 },
    h6: { fontWeight: 500 },
    subtitle1: { fontWeight: 500 },
    button: {
      fontWeight: 600,
      textTransform: "none",
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          },
        },
        containedPrimary: ({ theme }) => ({
          background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
        }),
      },
    },
    MuiCard: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          borderRadius: 16,
          padding: "16px",
        },
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
  },
};

// Light theme
const lightTheme = {
  ...commonTheme,
  palette: {
    mode: "light",
    primary: {
      light: "#6B8AFF",
      main: "#2563EB",
      dark: "#1E40AF",
      contrastText: "#fff",
    },
    secondary: {
      light: "#34D399",
      main: "#10B981",
      dark: "#059669",
      contrastText: "#fff",
    },
    error: {
      light: "#FCA5A5",
      main: "#EF4444",
      dark: "#B91C1C",
      contrastText: "#fff",
    },
    warning: {
      light: "#FBBF24",
      main: "#F59E0B",
      dark: "#D97706",
      contrastText: "#fff",
    },
    info: {
      light: "#93C5FD",
      main: "#3B82F6",
      dark: "#1D4ED8",
      contrastText: "#fff",
    },
    success: {
      light: "#34D399",
      main: "#10B981",
      dark: "#059669",
      contrastText: "#fff",
    },
    text: {
      primary: "#1F2937",
      secondary: "#4B5563",
      disabled: "#9CA3AF",
    },
    background: {
      default: "#F9FAFB",
      paper: "#FFFFFF",
    },
    divider: "rgba(0, 0, 0, 0.06)",
  },
};

// Dark theme
const darkTheme = {
  ...commonTheme,
  palette: {
    mode: "dark",
    primary: {
      light: "#93C5FD",
      main: "#3B82F6",
      dark: "#1D4ED8",
      contrastText: "#fff",
    },
    secondary: {
      light: "#6EE7B7",
      main: "#10B981",
      dark: "#059669",
      contrastText: "#fff",
    },
    error: {
      light: "#FCA5A5",
      main: "#EF4444",
      dark: "#B91C1C",
      contrastText: "#fff",
    },
    warning: {
      light: "#FDE68A",
      main: "#F59E0B",
      dark: "#D97706",
      contrastText: "#fff",
    },
    info: {
      light: "#93C5FD",
      main: "#3B82F6",
      dark: "#1D4ED8",
      contrastText: "#fff",
    },
    success: {
      light: "#6EE7B7",
      main: "#10B981",
      dark: "#059669",
      contrastText: "#fff",
    },
    text: {
      primary: "#F9FAFB",
      secondary: "#E5E7EB",
      disabled: "#6B7280",
    },
    background: {
      default: "#111827",
      paper: "#1F2937",
    },
    divider: "rgba(255, 255, 255, 0.08)",
  },
};

// Create theme function (THIS is what is used by default)
const createAppTheme = (mode) => {
  return mode === "dark" ? darkTheme : lightTheme;
};

// Export named exports
export { lightTheme, darkTheme };

// Export default function that returns the appropriate theme
export default createAppTheme;

import { alpha } from "@mui/material/styles";

export const lightTheme = {
  palette: {
    mode: "light",
    common: {
      black: "#000000",
      white: "#ffffff",
    },
    primary: {
      main: "#2E7DFF",
      light: "#5B9AFF",
      dark: "#0059CC",
    },
    secondary: {
      main: "#00C9A7",
      light: "#56FEDA",
      dark: "#009778",
    },
    background: {
      default: "#F7F9FC",
      paper: "#FFFFFF",
      alternate: "#F0F4FA",
    },
    text: {
      primary: "#202C3C",
      secondary: "#546E7A",
    },
    divider: "rgba(0, 0, 0, 0.08)",
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 600 },
    h2: { fontWeight: 600 },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    button: { fontWeight: 600 },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
        },
      },
    },
  },
};

export const darkTheme = {
  palette: {
    mode: "dark",
    common: {
      black: "#000000",
      white: "#ffffff",
    },
    primary: {
      main: "#4D8DFF",
      light: "#80B1FF",
      dark: "#0059CC",
    },
    secondary: {
      main: "#00D9B5",
      light: "#56FEDA",
      dark: "#009778",
    },
    background: {
      default: "#121D2B",
      paper: "#1A2536",
      alternate: "#243040",
    },
    text: {
      primary: "#E5EAF2",
      secondary: "#B0BEC5",
    },
    divider: "rgba(255, 255, 255, 0.08)",
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 600 },
    h2: { fontWeight: 600 },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    button: { fontWeight: 600 },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.15)",
        },
      },
    },
  },
};

// Add default export function that returns the appropriate theme
export default function getTheme(mode) {
  return mode === "light" ? lightTheme : darkTheme;
}

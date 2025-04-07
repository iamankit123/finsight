import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import getTheme from "./styles/theme";
import { FinancialDataProvider } from "./context/FinancialDataContext";
import { ThemeProvider, useThemeMode } from "./context/ThemeContext";
import { BrowserRouter as Router } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ThemeProvider>
        <ThemedApp />
      </ThemeProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

function ThemedApp() {
  // Get the theme mode from ThemeContext
  const { mode } = useThemeMode();

  // Generate the theme based on the current mode
  const theme = React.useMemo(() => getTheme(mode), [mode]);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <FinancialDataProvider>
        <App />
      </FinancialDataProvider>
    </MuiThemeProvider>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React, { useState, useMemo } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { FinancialDataProvider } from "./context/FinancialDataContext";
import { lightTheme, darkTheme } from "./styles/themeFix";
import Header from "./components/common/Header";
import Sidebar from "./components/common/Sidebar";
import FinancialBackground from "./components/common/FinancialBackground";
import BetterErrorBoundary from "./components/common/BetterErrorBoundary";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import ExpensePage from "./pages/ExpensePage";
import InvestmentsPage from "./pages/InvestmentsPage";
import SavingsPage from "./pages/SavingsPage";
import InsurancePage from "./pages/InsurancePage";

function App() {
  const [mode, setMode] = useState(
    localStorage.getItem("themeMode") || "light"
  );
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const toggleThemeMode = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    localStorage.setItem("themeMode", newMode);
  };

  // Create theme by directly accessing the theme objects
  const currentTheme = useMemo(() => {
    // Choose theme object based on mode - no function calls, just object reference
    const themeObject = mode === "light" ? lightTheme : darkTheme;

    // Create the final theme with createTheme
    return createTheme(themeObject);
  }, [mode]);

  const handleSidebarToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Check if we're on the landing page
  const isLandingPage = location.pathname === "/";

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <FinancialBackground />
      <BetterErrorBoundary clearDataOnError={false}>
        <FinancialDataProvider>
          <Box sx={{ display: "flex", minHeight: "100vh" }}>
            {/* Only show Sidebar when not on landing page */}
            {!isLandingPage && (
              <Sidebar
                mobileOpen={mobileOpen}
                onMobileClose={() => setMobileOpen(false)}
              />
            )}
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                width: "100%",
              }}
            >
              {/* Only show Header when not on landing page */}
              {!isLandingPage && (
                <Header
                  toggleThemeMode={toggleThemeMode}
                  onSidebarToggle={handleSidebarToggle}
                />
              )}
              <Box
                sx={{
                  p: isLandingPage ? 0 : { xs: 2, md: 3 },
                  pb: isLandingPage ? 0 : 6,
                  height: "100%",
                }}
              >
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/expenses" element={<ExpensePage />} />
                  <Route path="/investments" element={<InvestmentsPage />} />
                  <Route path="/savings" element={<SavingsPage />} />
                  <Route path="/insurance" element={<InsurancePage />} />
                </Routes>
              </Box>
            </Box>
          </Box>
        </FinancialDataProvider>
      </BetterErrorBoundary>
    </ThemeProvider>
  );
}

export default App;

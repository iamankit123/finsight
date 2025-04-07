import React, { createContext, useState, useContext, useEffect } from "react";

const ThemeContext = createContext();

export const useThemeMode = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  // Check if there's a saved theme preference in local storage
  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem("themeMode");
    return savedMode || "light"; // Default to light mode
  });

  const toggleThemeMode = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    localStorage.setItem("themeMode", newMode);
  };

  // The value that will be provided to consumers of this context
  const themeContextValue = {
    mode,
    toggleThemeMode,
  };

  return (
    <ThemeContext.Provider value={themeContextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Check localStorage first, default to true (dark) if nothing found
  const [dark, setDark] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? JSON.parse(savedTheme) : true;
  });

  useEffect(() => {
    // Apply the class to the HTML tag
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", JSON.stringify(true));
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", JSON.stringify(false));
    }
  }, [dark]);

  const toggleTheme = () => setDark(!dark);

  return (
    <ThemeContext.Provider value={{ dark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
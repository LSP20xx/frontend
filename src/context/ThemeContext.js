import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LightTheme, DarkTheme } from "../constants";

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(LightTheme);
  const [isLightTheme, setIsLightMode] = useState(true);

  useEffect(() => {
    const loadThemePreference = async () => {
      const storedThemePreference = await AsyncStorage.getItem(
        "themePreference"
      );
      if (storedThemePreference) {
        const isLight = storedThemePreference === "light";
        setTheme(isLight ? LightTheme : DarkTheme);
        setIsLightMode(isLight);
      }
    };

    loadThemePreference();
  }, []);

  const toggleTheme = async () => {
    const newIsLightTheme = !isLightTheme;
    setTheme(newIsLightTheme ? LightTheme : DarkTheme);
    setIsLightMode(newIsLightTheme);
    await AsyncStorage.setItem(
      "themePreference",
      newIsLightTheme ? "light" : "dark"
    );
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isLightTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  FC,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LightTheme, DarkTheme } from '../constants';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { COLORS } from '../constants';

interface ThemeContextProps {
  theme: typeof LightTheme;
  toggleTheme: () => void;
  isLightTheme: boolean;
}

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const useTheme = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState(LightTheme);
  const [isLightTheme, setIsLightMode] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadThemePreference = async () => {
      const storedThemePreference =
        await AsyncStorage.getItem('themePreference');
      if (storedThemePreference) {
        const isLight = storedThemePreference === 'light';
        setTheme(isLight ? LightTheme : DarkTheme);
        setIsLightMode(isLight);
      }
      setIsLoading(false);
    };

    loadThemePreference();
  }, []);

  const toggleTheme = async () => {
    const newIsLightTheme = !isLightTheme;
    setTheme(newIsLightTheme ? LightTheme : DarkTheme);
    setIsLightMode(newIsLightTheme);
    await AsyncStorage.setItem(
      'themePreference',
      newIsLightTheme ? 'light' : 'dark',
    );
  };

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={COLORS.primaryLight} />
      </View>
    );
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isLightTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});

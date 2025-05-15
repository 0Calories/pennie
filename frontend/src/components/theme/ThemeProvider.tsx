import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check localStorage first
    const savedTheme = localStorage.getItem('theme') as Theme;
    return savedTheme || 'system';
  });

  useEffect(() => {
    // Save theme preference to localStorage
    localStorage.setItem('theme', theme);

    // Handle system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleThemeChange = () => {
      if (theme === 'system') {
        document.documentElement.classList.toggle('dark', mediaQuery.matches);
      }
    };

    // Initial setup
    if (theme === 'system') {
      document.documentElement.classList.toggle('dark', mediaQuery.matches);
    } else {
      document.documentElement.classList.toggle('dark', theme === 'dark');
    }

    // Listen for system theme changes
    mediaQuery.addEventListener('change', handleThemeChange);

    return () => mediaQuery.removeEventListener('change', handleThemeChange);
  }, [theme]);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

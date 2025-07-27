import {
  type ColorScheme,
  type Theme,
  type ThemeConfig,
  defaultThemeConfig,
} from '@/lib/themes';
import { useCallback, useEffect, useState } from 'react';

interface UseThemeReturn {
  config: ThemeConfig;
  resolvedTheme: 'light' | 'dark';
  setTheme: (theme: Theme) => void;
  setColorScheme: (colorScheme: ColorScheme) => void;
  setRadius: (radius: ThemeConfig['radius']) => void;
  setFontSize: (fontSize: ThemeConfig['fontSize']) => void;
  resetTheme: () => void;
}

export function useTheme(): UseThemeReturn {
  const [config, setConfig] = useState<ThemeConfig>(() => {
    // Load from localStorage on initialization
    const saved = localStorage.getItem('theme-config');
    if (saved !== null) {
      try {
        return JSON.parse(saved) as ThemeConfig;
      } catch {
        return defaultThemeConfig;
      }
    }
    return defaultThemeConfig;
  });

  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');

  // Update localStorage when config changes
  useEffect(() => {
    localStorage.setItem('theme-config', JSON.stringify(config));
  }, [config]);

  // Handle system theme detection
  useEffect(() => {
    if (config.theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const updateTheme = (): void => {
        setResolvedTheme(mediaQuery.matches ? 'dark' : 'light');
      };

      updateTheme();
      mediaQuery.addEventListener('change', updateTheme);
      return (): void => {
        mediaQuery.removeEventListener('change', updateTheme);
      };
    } else {
      setResolvedTheme(config.theme);
    }
  }, [config.theme]);

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(resolvedTheme);
  }, [resolvedTheme]);

  const setTheme = useCallback((theme: Readonly<Theme>): void => {
    setConfig(prev => ({ ...prev, theme }));
  }, []);

  const setColorScheme = useCallback(
    (colorScheme: Readonly<ColorScheme>): void => {
      setConfig(prev => ({ ...prev, colorScheme }));
    },
    [],
  );

  const setRadius = useCallback(
    (radius: Readonly<ThemeConfig['radius']>): void => {
      setConfig(prev => ({ ...prev, radius }));
    },
    [],
  );

  const setFontSize = useCallback(
    (fontSize: Readonly<ThemeConfig['fontSize']>): void => {
      setConfig(prev => ({ ...prev, fontSize }));
    },
    [],
  );

  const resetTheme = useCallback((): void => {
    setConfig(defaultThemeConfig);
  }, []);

  return {
    config,
    resolvedTheme,
    setTheme,
    setColorScheme,
    setRadius,
    setFontSize,
    resetTheme,
  };
}

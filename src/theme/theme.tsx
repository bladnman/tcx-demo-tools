import React, { ReactNode, useMemo } from 'react';
import {
  createTheme,
  PaletteColor,
  ThemeProvider,
  Theme,
} from '@mui/material/styles';

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    title: true;
  }
}
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    bg: true;
  }
}

interface ThemeProps {
  colorMode: 'light' | 'dark';
  children?: ReactNode;
}
export type ThemePaletteColors = {
  [key: string]: string[];
};
const AppThemeProvider: React.FC<ThemeProps> = ({ colorMode, children }) => {
  // very simple tool to help you manage your colors
  // https://metal-sole.com/apps/mui-theme/
  const THEME_COLORS = useMemo(
    () => ({
      pri: ['#707898', '#707898'],
      sec: ['#8a599c', '#8a599c'],
      fg: ['#38363e', '#c0bcc6'],
      bg: ['#eeeef1', '#272729'],
      paper: ['#f9f9f9', '#0d0d0e'],
      appColor: ['#ccd857', '#ccd857'],
    }),
    [],
  ); // your colors here

  const theme = useMemo(
    () => createDynamicTheme(colorMode, THEME_COLORS),
    [colorMode, THEME_COLORS],
  );
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
export default AppThemeProvider;
export const LightTheme: React.FC<{ children?: ReactNode }> = ({
  children,
}) => {
  return <AppThemeProvider colorMode="light">{children}</AppThemeProvider>;
};
// DarkTheme helper component
export const DarkTheme: React.FC<{ children?: ReactNode }> = ({ children }) => {
  return <AppThemeProvider colorMode="dark">{children}</AppThemeProvider>;
};

/**
 * https://m2.material.io/inline-tools/color/
 */
// eslint-disable-next-line react-refresh/only-export-components
export const createDynamicTheme = (
  mode: 'light' | 'dark',
  colors: ThemePaletteColors,
) => {
  const themeColors = mapColors(mode, colors);

  let theme = createTheme({
    palette: {
      mode: mode,

      primary: {
        main: themeColors.pri,
      },
      secondary: {
        main: themeColors.sec,
      },
      background: {
        default: themeColors.bg,
        paper: themeColors.paper,
      },
      text: {
        primary: themeColors.fg,
      },
    },
    typography: {
      fontFamily: 'Arial, sans-serif', // Your default font
      // @ts-expect-error - lazy me
      title: {
        fontFamily: 'sofachrome, Arial, sans-serif',
        fontWeight: '400',
        fontSize: '1.1rem',
      },
    },
  });
  theme = augmentThemeWithPaletteColors(theme, themeColors);

  return theme;
};

//  _  _ ___ _    ___ ___ ___  ___
// | || | __| |  | _ \ __| _ \/ __|
// | __ | _|| |__|  _/ _||   /\__ \
// |_||_|___|____|_| |___|_|_\|___/
function mapColors(mode: 'light' | 'dark', colors: ThemePaletteColors) {
  // map each key from the colors object to the corresponding color
  const colorMap: { [key: string]: string } = {};
  Object.keys(colors).forEach((key) => {
    const color = colors[key];
    if (color.length === 1) {
      colorMap[key] = color[0];
    } else {
      colorMap[key] = color[mode === 'light' ? 0 : 1];
    }
  });

  return colorMap;
}

function augmentThemeWithPaletteColors(
  theme: Theme,
  config: { [key: string]: string },
) {
  const colors: { [key: string]: PaletteColor } = {};
  for (const key in config) {
    colors[key] = theme.palette.augmentColor({
      color: {
        main: config[key],
      },
      name: key,
    });
  }

  return createTheme(theme, {
    // Custom colors created with augmentColor go here
    palette: {
      ...colors,
    },
  });
}

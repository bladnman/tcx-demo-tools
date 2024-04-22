import React, { ReactNode, useMemo } from 'react';
import { createTheme, PaletteColor, Theme, ThemeProvider } from '@mui/material/styles';

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
  // LIGHT / DARK THEME COLORS
  const THEME_COLORS = useMemo(
    () => ({
      pri: ['#667195', '#9ca7d2'],
      sec: ['#8a599c', '#ad70ca'],
      cancel: ['#6c7074', '#9093a3'],
      paper: ['#d2d2d2', '#313135'],
      appBar: ['#333f54', '#333f54'],

      /**
       * App Colors
       * These should not venture into any gray-scale colors
       * Grays should be used for text and background colors
       */
      appEggplant: ['#614051', '#614051'],
      appRedWashed: ['#614051', '#614051'],
      appMaroon: ['#7c1818', '#7c1818'],
      appRed: ['#f62955', '#F62955'],
      appOrange: ['#ffa726', '#ffa726'],
      appGold: ['#ffd700', '#ffd700'],
      appYellow: ['#E3CF44', '#E3CF44'],
      appNeonGreen: ['#83d537', '#83d537'],
      appGreen: ['#68b85b', '#68b85b'],
      appGreenWashed: ['#536b4f', '#536b4f'],
      appMint: ['#98ff98', '#98ff98'],
      appSlate: ['#769386', '#769386'],
      appCyan: ['#00FFFF', '#00FFFF'],
      appBlue: ['#29b6f6', '#29b6f6'],
      appSkyBlue: ['#87CEEB', '#87CEEB'],
      appDeepBlue: ['#2a5598', '#2a5598'],
      appBlueWashed: ['#3f4c65', '#3f4c65'],
      appPurple: ['#7129f6', '#7129F6'],
      appIndigo: ['#7f2ac5', '#7f2ac5'],
      appIndigoWashed: ['#684d7c', '#684d7c'],
      appPink: ['#f629d7', '#f629d7'],
      appViolet: ['#EE82EE', '#EE82EE'],
      appBronze: ['#cd7f32', '#cd7f32'],
      appBrown: ['#8b6e63', '#8b6e63'],

      // BG COLORS
      bg: ['#eeeef1', '#272729'],
      bg10: ['#2d2d30', '#ebebeb'],
      bg15: ['#323235', '#e0e0e0'],
      bg20: ['#38383b', '#e0e0e0'],
      bg25: ['#4b4b50', '#cecece'],
      bg50: ['#8b8b8b', '#8b8b8b'],
      bg75: ['#cecece', '#4b4b50'],
      bg80: ['#e0e0e0', '#38383b'],
      bg85: ['#e0e0e0', '#323235'],
      bg90: ['#ebebeb', '#2d2d30'],

      // FG COLORS
      fg: ['#38363e', '#c0bcc6'],
      fg10: ['#eaeaea', '#1f1f1f'],
      fg15: ['#e6e6e6', '#202020'],
      fg25: ['#cecece', '#3e3e3e'],
      fg35: ['#a0a0a0', '#626262'],
      fg50: ['#8b8b8b', '#8b8b8b'],
      fg65: ['#626262', '#a0a0a0'],
      fg75: ['#3e3e3e', '#cecece'],
      fg85: ['#2a2a2a', '#e4e4e4'],
      fg90: ['#1f1f1f', '#eaeaea'],

      // TOKEN DETAILS COLORS
      tokenDetailsFG: ['#8b8b8b', '#8b8b8b'],
      tokenDetailsBG: ['#383838', '#383838'],
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
export const LightTheme: React.FC<{ children?: ReactNode }> = ({ children }) => {
  return <AppThemeProvider colorMode="light">{children}</AppThemeProvider>;
};
// DarkTheme helper component
export const DarkTheme: React.FC<{ children?: ReactNode }> = ({ children }) => {
  return <AppThemeProvider colorMode="dark">{children}</AppThemeProvider>;
};

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    title: true;
    tag: true;
    tokenDetailHighlight: true;
    tokenDetailMessage: true;
    detailSummaryRowLabel: true;
    detailSummaryRowValue: true;
    detailSummaryRowValueEmpty: true;
    thick: true;
    thin: true;
    thickThin: true;
  }
}

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
      tag: {
        fontFamily: 'urbana, Arial, sans-serif',
        fontSize: '1.2em',
        fontWeight: 'bold',
      },
      tokenDetailHighlight: {
        fontFamily: 'anton, Arial, sans-serif',
        fontSize: '1em',
        fontWeight: 'bold',
      },
      tokenDetailMessage: {
        fontFamily: 'elza-narrow, Arial, sans-serif',
        fontSize: '0.85em',
      },
      detailSummaryRowLabel: {
        fontFamily: 'elza-narrow, Arial, sans-serif',
        fontSize: '1em',
        lineHeight: '0.25em',
        opacity: 0.3,
      },
      detailSummaryRowValue: {
        fontFamily: 'anton, Arial, sans-serif',
        fontSize: '1.2em',
      },
      detailSummaryRowValueEmpty: {
        fontFamily: 'anton, Arial, sans-serif',
        fontSize: '1.2em',
        opacity: 0.2,
      },
      thick: {
        fontFamily: 'urbana, Arial, sans-serif',
      },
      thin: {
        fontFamily: 'elza-narrow, Arial, sans-serif',
      },
      thickThin: {
        fontFamily: 'anton, Arial, sans-serif',
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

function augmentThemeWithPaletteColors(theme: Theme, config: { [key: string]: string }) {
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

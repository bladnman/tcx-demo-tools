import React, { ReactNode, useMemo } from 'react';
import {
  createTheme,
  PaletteColor,
  ThemeProvider,
  Theme,
} from '@mui/material/styles';

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
      sec: ['#8a599c', '#ad70ca'],
      fg: ['#38363e', '#c0bcc6'],
      bg: ['#eeeef1', '#272729'],
      // paper: ['#f9f9f9', '#0d0d0e'],
      paper: ['#d2d2d2', '#313135'],
      appBar: ['#333f54', '#333f54'],

      appColor: ['#ccd857', '#ccd857'],
      appRed: ['#f62955', '#f62955'],
      appOrange: ['#ffa726', '#ffa726'],
      appGreen: ['#68b85b', '#68b85b'],
      appBlue: ['#29b6f6', '#29b6f6'],
      appPurple: ['#7129f6', '#7129F6'],
      appPink: ['#f629d7', '#f629d7'],
      appSlate: ['#769386', '#769386'],
      appGray: ['#8b8bE8b', '#8b8b8b'],
      appGrayDark: ['#464646', '#464646'],
      appGrayVeryDark: ['#323232', '#323232'],
      appWhite: ['#ffffff', '#ffffff'],
      appBlack: ['#000000', '#000000'],
      appBrown: ['#8b6e63', '#8b6e63'],
      appGold: ['#ffd700', '#ffd700'],
      appSilver: ['#c0c0c0', '#c0c0c0'],
      appBronze: ['#cd7f32', '#cd7f32'],
      appEggplant: ['#614051', '#614051'],
      appMaroon: ['#800000', '#800000'],
      appMint: ['#98ff98', '#98ff98'],
      appNeonGreen: ['#83d537', '#83d537'],
      appBrightRed: ['#f62955', '#F62955'],
      appYellow: ['#E3CF44', '#E3CF44'],

      appBg10: ['#3e3e3e', '#ebebeb'],
      appBg25: ['#3e3e3e', '#cecece'],
      appBg50: ['#8b8b8b', '#8b8b8b'],
      appBg75: ['#cecece', '#3e3e3e'],
      appBg90: ['#cecece', '#292929'],

      bg10: ['#2d2d30', '#ebebeb'],
      bg15: ['#323235', '#e0e0e0'],
      bg20: ['#38383b', '#e0e0e0'],
      bg25: ['#4b4b50', '#cecece'],
      bg50: ['#8b8b8b', '#8b8b8b'],
      bg75: ['#cecece', '#4b4b50'],
      bg80: ['#e0e0e0', '#38383b'],
      bg85: ['#e0e0e0', '#323235'],
      bg90: ['#ebebeb', '#2d2d30'],

      appFg25: ['#cecece', '#3e3e3e'],
      appFg50: ['#8b8b8b', '#8b8b8b'],
      appFg75: ['#3e3e3e', '#cecece'],

      fg10: ['#eaeaea', '#1f1f1f'],
      fg15: ['#e6e6e6', '#202020'],
      fg25: ['#cecece', '#3e3e3e'],
      fg35: ['#a0a0a0', '#626262'],
      fg50: ['#8b8b8b', '#8b8b8b'],
      fg65: ['#626262', '#a0a0a0'],
      fg75: ['#3e3e3e', '#cecece'],
      fg85: ['#2a2a2a', '#e4e4e4'],
      fg90: ['#1f1f1f', '#eaeaea'],

      // TOKEN COLORS
      tokenYellow: ['#E3CF44', '#E3CF44'],
      tokenOrange: ['#ffa726', '#ffa726'],
      tokenGreen: ['#68b85b', '#68b85b'],
      tokenBlue: ['#29b6f6', '#29b6f6'],
      tokenPurple: ['#7129f6', '#7129F6'],
      tokenPink: ['#f629d7', '#f629d7'],
      tokenRed: ['#f62955', '#F62955'],
      tokenSlate: ['#769386', '#769386'],
      tokenGray: ['#8b8b8b', '#8b8b8b'],
      tokenGrayDark: ['#464646', '#464646'],
      tokenGrayVeryDark: ['#323232', '#323232'],
      tokenWhite: ['#ffffff', '#ffffff'],
      tokenBlack: ['#000000', '#000000'],
      tokenBrown: ['#8b6e63', '#8b6e63'],
      tokenGold: ['#ffd700', '#ffd700'],
      tokenSilver: ['#c0c0c0', '#c0c0c0'],
      tokenBronze: ['#cd7f32', '#cd7f32'],
      tokenEggplant: ['#614051', '#614051'],
      tokenMaroon: ['#800000', '#800000'],
      tokenMint: ['#98ff98', '#98ff98'],
      tokenNeonGreen: ['#83d537', '#83d537'],
      tokenBrightRed: ['#f62955', '#F62955'],
      tokenYellowDim: ['#E3CF44', '#E3CF44'],
      tokenOrangeDim: ['#ffa726', '#ffa726'],
      tokenGreenDim: ['#68b85b', '#68b85b'],
      tokenBlueDim: ['#29b6f6', '#29b6f6'],
      tokenPurpleDim: ['#7129f6', '#7129F6'],
      tokenPinkDim: ['#f629d7', '#f629d7'],
      tokenRedDim: ['#f62955', '#F62955'],
      tokenSlateDim: ['#769386', '#769386'],
      tokenGrayDim: ['#8b8b8b', '#8b8b8b'],
      tokenGrayDarkDim: ['#464646', '#464646'],
      tokenGrayVeryDarkDim: ['#323232', '#323232'],
      tokenWhiteDim: ['#ffffff', '#ffffff'],
      tokenBlackDim: ['#000000', '#000000'],
      tokenBrownDim: ['#8b6e63', '#8b6e63'],
      tokenGoldDim: ['#ffd700', '#ffd700'],
      tokenSilverDim: ['#c0c0c0', '#c0c0c0'],
      tokenBronzeDim: ['#cd7f32', '#cd7f32'],
      tokenEggplantDim: ['#614051', '#614051'],
      tokenMaroonDim: ['#800000', '#800000'],
      tokenMintDim: ['#98ff98', '#98ff98'],
      tokenNeonGreenDim: ['#83d537', '#83d537'],
      tokenBrightRedDim: ['#f62955', '#F62955'],

      // TOKEN DETAILS COLORS
      tokenDetailsFG: ['#8b8b8b', '#8b8b8b'],
      tokenDetailsBG: ['#383838', '#383838'],
      tokenDetailsFGOrange: ['#ffa726', '#ffa726'],
      tokenDetailsFGGreen: ['#68b85b', '#68b85b'],
      tokenDetailsFGRed: ['#ff436b', '#ff436b'],
      tokenDetailsFGBlue: ['#29b6f6', '#29b6f6'],
      tokenDetailsFGPurple: ['#7129f6', '#7129F6'],
      tokenDetailsFGPink: ['#f629d7', '#f629d7'],
      tokenDetailsFGSlate: ['#769386', '#769386'],
      tokenDetailsFGGray: ['#8b8b8b', '#8b8b8b'],
      tokenDetailsFGGrayDark: ['#464646', '#464646'],
      tokenDetailsFGGrayVeryDark: ['#323232', '#323232'],
      tokenDetailsFGWhite: ['#ffffff', '#ffffff'],
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

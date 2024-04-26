import { useTheme } from '@mui/material';
import { useMemo } from 'react';

export interface CustomPaletteColor {
  main: string;
  light?: string;
  dark?: string;
  contrastText?: string;
  name?: string;
}

type ColorsHash = {
  [key: string]: CustomPaletteColor;
};
export default function useTagColors() {
  const theme = useTheme();
  return useMemo(() => {
    const tagColorsHash: ColorsHash = Object.keys(theme.palette)
      .filter((key) => key.startsWith('app'))
      .reduce((acc, key) => {
        const color = (theme.palette as Hash)[key as string];
        if (color) {
          (acc as Hash)[key] = color as CustomPaletteColor;
        }
        return acc;
      }, {} as ColorsHash);

    const tagColorsArray: CustomPaletteColor[] = Object.keys(tagColorsHash).map((key) => {
      const color = tagColorsHash[key];
      return {
        name: key,
        ...color,
      };
    });
    return { tagColorsArray, tagColorsHash };
  }, [theme.palette]);
}

import { useTheme } from '@mui/material';
import { useEffect } from 'react';

export default function useThemeOnDocument() {
  const theme = useTheme();
  useEffect(() => {
    document.body.style.backgroundColor = theme.palette.background.default;
    document.body.style.color = theme.palette.text.primary;
  }, [theme]);
}

import React, { ReactNode } from 'react';
import Box from '@mui/material/Box';

interface BackgroundProps {
  children?: ReactNode; // Allows this component to accept children
}

const Background: React.FC<BackgroundProps> = ({ children }) => {
  return (
    <Box
      sx={{
        backgroundColor: 'bg.main',
        color: 'fg.main',
      }}
      className={'background'}
    >
      {children}
    </Box>
  );
};

export default Background;

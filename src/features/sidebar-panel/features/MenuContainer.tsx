import React, { ReactNode } from 'react';
import { VStack } from '@common/mui-stacks.tsx';
import { BoxProps, Typography } from '@mui/material';

interface MenuContainerProps {
  title: string;
  children?: ReactNode;
  actionBar?: ReactNode;
  sx?: BoxProps;
}

// Update the function component to accept the defined props
const MenuContainer: React.FC<MenuContainerProps> = ({
  title,
  children,
  actionBar,
  sx,
}) => {
  return (
    <VStack spacing={0} hFill topLeft>
      <Typography variant="title" fontSize={'1.2em'}>
        {title}
      </Typography>
      <VStack
        topLeft
        hFill
        sx={{
          px: 0.5,
          borderStyle: 'solid',
          borderWidth: '2px',
          borderColor: 'bg75.main',
          borderRadius: '0.5em',
          ...sx,
        }}
      >
        {children}
        {actionBar}
      </VStack>
    </VStack>
  );
};

export default MenuContainer;

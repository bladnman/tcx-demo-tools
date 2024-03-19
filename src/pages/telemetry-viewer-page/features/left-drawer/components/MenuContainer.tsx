import React, { ReactNode } from 'react';
import { VStack } from '@common/mui-stacks.tsx';
import { Typography } from '@mui/material';

// Define the props type
interface MenuContainerProps {
  title: string; // Assuming title is a string
  children?: ReactNode; // children can be any valid React node
  actionBar?: ReactNode; // actionBar can be any valid React node, optional
}

// Update the function component to accept the defined props
const MenuContainer: React.FC<MenuContainerProps> = ({
  title,
  children,
  actionBar,
}) => {
  const xPadding = 0.5;

  return (
    <VStack spacing={0} hFill topLeft>
      <Typography variant="title" fontSize={'1.2em'}>
        {title}
      </Typography>
      <VStack
        topLeft
        hFill
        sx={{
          px: xPadding,
          borderStyle: 'solid',
          borderWidth: '2px',
          borderColor: 'bg75.main',
          borderRadius: '0.5em',
        }}
      >
        {children}
        {actionBar}
      </VStack>
    </VStack>
  );
};

export default MenuContainer;

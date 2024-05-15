import AppNavBar from '@common/app-nav-frame/features/app-nav-bar/AppNavBar.tsx';
import { VStack } from '@common/mui-stacks.tsx';
import AppArchitectureProvider from '@common/providers/AppArchitectureProvider.tsx';
import React from 'react';

interface AppNavFrameProps {
  children: React.ReactNode;
}

const AppNavFrame: React.FC<AppNavFrameProps> = ({ children }) => {
  return (
    <AppArchitectureProvider>
      <VStack fill data-id={'app-nav-frame'} spacing={0} sx={{ overflow: 'hidden' }}>
        <AppNavBar />

        <VStack fill top data-id={'route-body'} sx={{ overflow: 'auto' }}>
          {children}
        </VStack>
      </VStack>
    </AppArchitectureProvider>
  );
};

export default AppNavFrame;

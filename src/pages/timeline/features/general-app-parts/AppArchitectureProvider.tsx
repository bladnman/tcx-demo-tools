import { DarkTheme } from '@theme/theme.tsx';
import React from 'react';
import { ConfirmProvider } from 'material-ui-confirm';
import DialogProvider from '@pages/timeline/features/general-app-parts/providers/DialogProvider.tsx';
import SnackBarProvider from '@pages/timeline/features/general-app-parts/providers/SnackBarProvider.tsx';
import KeyboardProvider from '@pages/timeline/features/general-app-parts/providers/KeyboardProvider.tsx';
import ReceiverProvider from '@pages/timeline/features/general-app-parts/providers/ReceiverProvider.tsx';

export default function AppArchitectureProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DarkTheme>
      <ConfirmProvider>
        <ReceiverProvider />
        <DialogProvider />
        <SnackBarProvider />
        <KeyboardProvider />

        {children}
      </ConfirmProvider>
    </DarkTheme>
  );
}

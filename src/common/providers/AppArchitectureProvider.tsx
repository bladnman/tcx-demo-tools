import { DarkTheme } from '@theme/theme.tsx';
import React from 'react';
import { ConfirmProvider } from 'material-ui-confirm';
import DialogProvider from '@common/providers/parts/DialogProvider.tsx';
import SnackBarProvider from '@common/providers/parts/SnackBarProvider.tsx';
import KeyboardProvider from '@common/providers/parts/KeyboardProvider.tsx';
import ReceiverProvider from '@src/receiver/ReceiverProvider.tsx';

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

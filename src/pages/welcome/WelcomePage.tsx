import AppNavFrame from '@common/app-nav-frame/AppNavFrame.tsx';
import { VStack } from '@common/mui-stacks.tsx';
import { Typography } from '@mui/material';

export default function WelcomePage() {
  return (
    <AppNavFrame>
      <VStack fill data-id={'welcome-page'} spacing={4}>
        <Typography variant={'h5'}>Welcome to TWiz</Typography>
      </VStack>
    </AppNavFrame>
  );
}

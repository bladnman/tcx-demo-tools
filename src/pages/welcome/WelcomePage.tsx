import AppNavFrame from '@common/app-nav-frame/AppNavFrame.tsx';
import { VStack } from '@common/mui-stacks.tsx';

export default function WelcomePage() {
  return (
    <AppNavFrame>
      <VStack fill data-id={'welcome-page'}>
        Welcome to TWiz
      </VStack>
    </AppNavFrame>
  );
}

import useThemeOnDocument from '@hooks/useThemeOnDocument.ts';
import AppRouter from '@src/features/app-router/AppRouter.tsx';
import { VStack } from './common/mui-stacks.tsx';
import './App.css';

function App() {
  useThemeOnDocument();
  return (
    <VStack fill sx={{ flexGrow: 1 }} data-id={'app'}>
      <AppRouter />
    </VStack>
  );
}

export default App;

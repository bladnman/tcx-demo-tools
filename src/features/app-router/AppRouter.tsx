import { VStack } from '@common/mui-stacks.tsx';
import routeConfig from '@src/features/app-router/routeConfig.ts';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const AppRouter = () => {
  return (
    <Router>
      <VStack fill spacing={0} data-id={'app-router'}>
        <Routes>
          {routeConfig.map((route) => (
            <Route key={route.path} path={route.path} element={<route.component />} />
          ))}
        </Routes>
      </VStack>
    </Router>
  );
};

export default AppRouter;

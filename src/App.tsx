import { VStack } from './common/mui-stacks.tsx';
import './App.css';
import useThemeOnDocument from '@hooks/useThemeOnDocument.ts';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TimelinePage from '@pages/timeline/TimelinePage.tsx';

function App() {
  useThemeOnDocument();
  return (
    <VStack fill sx={{ flexGrow: 1 }} data-id={'app'}>
      <Router>
        <VStack fill spacing={0} vAlign={'leading'} data-id={'inner-router'}>
          <Routes>
            <Route path="/" element={<TimelinePage />} />
          </Routes>
        </VStack>
      </Router>
    </VStack>
  );
}

export default App;

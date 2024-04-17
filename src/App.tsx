import { VStack } from './common/mui-stacks.tsx';
import './App.css';
import useThemeOnDocument from '@hooks/useThemeOnDocument.ts';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TelemetryViewerPage from '@pages/telemetry-viewer-page/TelemetryViewerPage.tsx';
import WelcomePage from '@pages/welcome-page/WelcomePage.tsx';

function App() {
  useThemeOnDocument();
  return (
    <VStack fill sx={{ flexGrow: 1 }} data-id={'app'}>
      <Router>
        <VStack fill spacing={0} vAlign={'leading'} data-id={'inner-router'}>
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route
              path="/telemetry"
              element={<TelemetryViewerPage />}
              data-id={'route'}
            />
          </Routes>
        </VStack>
      </Router>
    </VStack>
  );
}

export default App;

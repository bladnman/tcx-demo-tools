import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { DarkTheme } from '@theme/theme.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <DarkTheme>
    <App />
  </DarkTheme>,
);

import SequencesPage from '@pages/sequences/SequencesPage.tsx';
import TimelinePage from '@pages/timeline/TimelinePage.tsx';
import WelcomePage from '@pages/welcome/WelcomePage.tsx';

/**
 * Route configuration for the app.
 *
 * Order matters (tabs are displayed in the order of this array).
 *
 * Only routes with a label will be displayed in the nav bar.
 */
const routeConfig = [
  { path: '/', component: WelcomePage },
  { path: '/welcome', label: 'Welcome', component: WelcomePage },
  { path: '/timeline', label: 'Timeline', component: TimelinePage },
  { path: '/sequences', label: 'Sequences', component: SequencesPage },
  { path: '/summary', label: 'Summary', component: WelcomePage },
];

export default routeConfig;

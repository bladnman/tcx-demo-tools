import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  SxProps,
  Tab,
  Tabs,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { SyntheticEvent, useRef, useState } from 'react';
import useSettingsStore from '@pages/telemetry-viewer-page/store/settings-store/useSettingsStore.ts';
import Box from '@mui/material/Box';
import DisplayOptions from '@pages/telemetry-viewer-page/features/dialogs/settings-dialog/features/display-options/DisplayOptions.tsx';
import ConnectionOptions from '@pages/telemetry-viewer-page/features/dialogs/settings-dialog/features/connection-options/ConnectionOptions.tsx';
import AboutOptions from '@pages/telemetry-viewer-page/features/dialogs/settings-dialog/features/about-options/AboutOptions.tsx';
import actionSetIsSettingsDialogOpen from '@pages/telemetry-viewer-page/store/settings-store/actions/actionSetIsSettingsDialogOpen.ts';

export default function SettingsDialog() {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const { isSettingsDialogOpen } = useSettingsStore();
  const [tabNumber, setTabNumber] = useState(0);

  const handleClose = useRef(() => {
    actionSetIsSettingsDialogOpen(false);
  }).current;
  const handleTabChange = (_event: SyntheticEvent, newValue: number) => {
    setTabNumber(newValue);
  };
  const containerSx: SxProps = {
    paddingTop: '2em',
    paddingX: '1em',
  };

  // if not full-screen, then set width and height
  if (!fullScreen) {
    containerSx.width = '800px';
    containerSx.height = '500px';
    containerSx.overflowY = 'auto';
  }

  return (
    <Dialog onClose={handleClose} open={isSettingsDialogOpen} maxWidth={'md'} fullScreen={fullScreen}>
      <DialogTitle sx={{ fontVariant: 'small-caps', fontSize: '1.7em' }}>Settings</DialogTitle>
      <DialogContent sx={{ flex: 1 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabNumber} onChange={handleTabChange}>
            <Tab label="Connection" />
            <Tab label="Display" />
            <Tab label="About" />
          </Tabs>
        </Box>
        <Box sx={containerSx}>
          {tabNumber === 0 && <ConnectionOptions />}
          {tabNumber === 1 && <DisplayOptions />}
          {tabNumber === 2 && <AboutOptions />}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

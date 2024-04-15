import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { HStack, VStack } from '@common/mui-stacks.tsx';
import useTelemetryStore from '@pages/telemetry-viewer-page/store/useTelemetryStore.ts';
import { useState } from 'react';
import DownloadIcon from '@mui/icons-material/Download';

export default function ExportDialog() {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const {
    isExportDialogOpen,
    setIsExportDialogOpen,
    allEvents,
    displayEvents,
  } = useTelemetryStore();

  const handleClose = () => {
    setIsExportDialogOpen(false);
  };

  const [fileName, setFileName] = useState('events');

  const handleDownloadAll = () => {
    downloadEvents(allEvents);
    handleClose();
  };
  const handleDownloadFiltered = () => {
    downloadEvents(displayEvents);
    handleClose();
  };
  const downloadEvents = (events: TVEvent[]) => {
    const json = JSON.stringify(events, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const href = URL.createObjectURL(blob);

    // Create a link and trigger the download
    const link = document.createElement('a');
    link.href = href;
    link.download = fileName.endsWith('.json') ? fileName : `${fileName}.json`;
    document.body.appendChild(link);
    link.click();

    // Clean up
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  };

  return (
    <Dialog
      onClose={handleClose}
      open={isExportDialogOpen}
      maxWidth={'md'}
      fullScreen={fullScreen}
    >
      <DialogTitle>Download</DialogTitle>
      <DialogContent>
        <VStack left>
          <Typography>Enter the filename for these events.</Typography>
          <HStack>
            <TextField
              autoFocus
              variant={'standard'}
              margin="dense"
              // label="File Name"
              type="text"
              fullWidth
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && fileName.trim() !== '') {
                  // delaying so the close animation can finish
                  setTimeout(() => handleDownloadAll(), 100);
                }
              }}
            />
            <Typography>.json</Typography>
          </HStack>
          <Typography sx={{ pt: 5 }}>
            You can choose to download all events (default) or only the filtered
            events. This allows you to filter to the events you want to save
            before downloading.
          </Typography>
        </VStack>
      </DialogContent>
      <DialogActions>
        {/*@ts-expect-error : using my own colors*/}
        <Button onClick={handleClose} color={'cancel'}>
          Cancel
        </Button>
        <Button
          onClick={handleDownloadFiltered}
          disabled={fileName.trim() === ''}
        >
          <DownloadIcon />
          Filtered events
        </Button>
        <Button onClick={handleDownloadAll} disabled={fileName.trim() === ''}>
          <DownloadIcon />
          All events
        </Button>
      </DialogActions>
    </Dialog>
  );
}

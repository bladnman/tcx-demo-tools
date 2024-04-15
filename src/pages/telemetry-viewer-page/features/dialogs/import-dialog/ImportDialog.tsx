import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import useTelemetryStore from '@pages/telemetry-viewer-page/store/useTelemetryStore.ts';
import { ChangeEvent, useRef } from 'react';

import { HStack, VStack } from '@common/mui-stacks.tsx';
import TelemetryList from '@pages/telemetry-viewer-page/features/main-body/features/telemetry-list/TelemetryList.tsx';
import CallMergeIcon from '@mui/icons-material/CallMerge';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
export default function ImportDialog() {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const {
    isImportDialogOpen,
    setIsImportDialogOpen,
    setAllEvents,
    addEvents,
    importingEvents,
    setImportingEvents,
  } = useTelemetryStore();

  const hasImportingEvents = importingEvents && importingEvents.length > 0;

  const handleClose = useRef(() => {
    setIsImportDialogOpen(false);
  }).current;
  const handleMerge = () => {
    addEvents(importingEvents ?? []);
    handleClose();
  };
  const handleReplace = () => {
    setAllEvents(importingEvents ?? []);
    handleClose();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const contents = e.target?.result;
        const events = JSON.parse(contents as string);
        if (!events || !Array.isArray(events) || events.length === 0) return;
        setImportingEvents(events);
      };
      reader.readAsText(file);
    }
  };

  const renderBody = () => {
    return hasImportingEvents
      ? renderFileContentsBody()
      : renderChooseFileBody();
  };

  const renderChooseFileBody = () => {
    return (
      <DialogContent>
        <Typography>
          Select a file to import. The file should be a JSON file containing an
          array of telemetry events.
        </Typography>
        <Typography>
          You can also drop a file onto the application to import it.
        </Typography>
      </DialogContent>
    );
  };

  const renderFileContentsBody = () => {
    return (
      <>
        <DialogContent sx={{ backgroundColor: 'bg.main' }}>
          <VStack sx={{ fontSize: '0.75em' }}>
            <TelemetryList
              events={importingEvents ?? []}
              allowDividers={false}
              allowSelection={false}
            />
          </VStack>
        </DialogContent>
        <DialogContent>
          <Typography>
            You are importing {importingEvents?.length ?? 0} items.
          </Typography>
          <Typography>
            Please choose to either merge these items with existing items, or
            replace everything.
          </Typography>
        </DialogContent>
      </>
    );
  };

  return (
    <Dialog
      onClose={handleClose}
      open={isImportDialogOpen}
      maxWidth={'md'}
      fullScreen={fullScreen}
    >
      <DialogTitle sx={{ fontVariant: 'small-caps', fontSize: '1.7em' }}>
        Import Data
      </DialogTitle>

      {renderBody()}

      <DialogActions>
        <HStack hFill spaceBetween>
          <HStack>
            <input
              accept=".json" // accept only .json files
              style={{ display: 'none' }} // hide the default file input
              id="raised-button-file"
              type="file"
              onChange={handleFileChange}
            />
            <label htmlFor="raised-button-file">
              <Button component="span" color="secondary">
                choose file...
              </Button>
            </label>
          </HStack>
          {hasImportingEvents && (
            <HStack>
              {/*@ts-expect-error : using my own colors*/}
              <Button onClick={handleClose} color="cancel">
                Close
              </Button>
              <Button onClick={handleMerge} color="primary">
                <CallMergeIcon />
                Merge
              </Button>
              <Button onClick={handleReplace} color="primary">
                <PublishedWithChangesIcon />
                Replace
              </Button>
            </HStack>
          )}
        </HStack>
      </DialogActions>
    </Dialog>
  );
}

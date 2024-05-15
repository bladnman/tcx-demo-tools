import { HStack, VStack } from '@common/mui-stacks.tsx';
import { loadEventsFromFiles } from '@dialogs/app-drop-dialog/utils/loadEventsFromFiles.ts';
import CallMergeIcon from '@mui/icons-material/CallMerge';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
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
import TimelineList from '@pages/timeline/features/main-body/features/timeline-list/TimelineList.tsx';
import actionClearSequences from '@store/event-store/actions/actionClearSequences.ts';
import actionMergeEvents from '@store/event-store/actions/actionMergeEvents.ts';
import { actionSetAllEventsAndRecalculateFilters } from '@store/event-store/actions/actionSetAllEventsAndRecalculateFilters.ts';
import { actionSetSequences } from '@store/event-store/actions/actionSetSequences.ts';
import useEventStore from '@store/event-store/useEventStore.ts';
import actionSetImportingEvents from '@store/settings-store/actions/actionSetImportingEvents.ts';
import actionSetImportingSequences from '@store/settings-store/actions/actionSetImportingSequences.ts';
import actionSetIsImportDialogOpen from '@store/settings-store/actions/actionSetIsImportDialogOpen.ts';
import actionSetIsImportingData from '@store/settings-store/actions/actionSetIsImportingData.ts';
import useSettingsStore from '@store/settings-store/useSettingsStore.ts';
import { ChangeEvent, useCallback, useEffect, useRef } from 'react';

export default function ImportDialog() {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const isImportDialogOpen = useSettingsStore((state) => state.isImportDialogOpen);
  const importingEvents = useSettingsStore((state) => state.importingEvents);
  const isImportingData = useSettingsStore((state) => state.isImportingData);
  const importingSequences = useSettingsStore((state) => state.importingSequences);
  const hasImportingEvents = !!importingEvents && importingEvents.length > 0;

  const handleClose = useRef(() => {
    actionSetIsImportDialogOpen(false);
    actionSetImportingEvents(null);
    actionSetImportingSequences(null);
    actionSetIsImportingData(false);
  }).current;
  const handleMerge = () => {
    doImport(importingEvents, true);
  };
  const handleReplace = () => {
    doImport(importingEvents, false);
  };
  const doImport = useCallback(
    (events: TVEvent[] | null, isMerge = false) => {
      if (!events) return;

      // CLEAR SEQUENCES
      actionClearSequences();

      // allow this to toggle the importing state
      actionSetIsImportingData(true);

      // we want to delay the close a bit while things draw
      setTimeout(() => {
        // MERGE
        if (isMerge) {
          actionMergeEvents(events);
        }

        // REPLACE
        else {
          actionSetAllEventsAndRecalculateFilters(events ?? []);
          actionSetSequences(importingSequences ?? {});
        }

        // we want to delay the close a bit while things draw
        setTimeout(() => {
          handleClose();
        }, 500);
      }, 200);
    },
    [handleClose, importingSequences],
  );

  useEffect(() => {
    const allEvents = useEventStore.getState().allEvents;
    // AUTO IMPORT
    if (!!importingEvents && allEvents?.length < 1) {
      doImport(importingEvents, false);
    }
  }, [handleClose, importingEvents, doImport]);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const { events, sequences } = await loadEventsFromFiles(event.target.files);

    // NOT A PROPER FILE
    if (!events || !Array.isArray(events) || events.length === 0) return; // TODO: message this to user

    actionSetImportingEvents(events);
    actionSetImportingSequences(sequences);
  };

  const renderBody = () => {
    if (isImportingData) return renderImportProgress();
    return hasImportingEvents ? renderFileContentsBody() : renderChooseFileBody();
  };

  const renderImportProgress = () => {
    return (
      <DialogContent>
        <Typography>Importing {importingEvents?.length ?? 0} items...</Typography>
      </DialogContent>
    );
  };

  const renderChooseFileBody = () => {
    return (
      <DialogContent>
        <Typography>
          Select a file to import. The file should be a JSON file containing an array of
          telemetry events.
        </Typography>
        <Typography>
          You can also drop a file onto the application to import it.
        </Typography>
      </DialogContent>
    );
  };

  const renderFileContentsBody = () => {
    const events = importingEvents?.slice(0, 20) ?? [];
    return (
      <>
        <DialogContent sx={{ backgroundColor: 'bg.main' }}>
          <VStack sx={{ fontSize: '0.75em' }}>
            <TimelineList
              events={events ?? []}
              allowDividers={false}
              allowSelection={false}
            />
          </VStack>
        </DialogContent>
        <DialogContent>
          <Typography>You are importing {importingEvents?.length ?? 0} items.</Typography>
          <Typography>
            Please choose to either merge these items with existing items, or replace
            everything.
          </Typography>
        </DialogContent>
      </>
    );
  };

  const renderDialogActions = () => {
    if (isImportingData) return null;
    return renderChoiceDialogActions();
  };
  const renderChoiceDialogActions = () => {
    return (
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
    );
  };

  if (!isImportDialogOpen) return null;
  return (
    <Dialog
      onClose={handleClose}
      open={isImportDialogOpen}
      maxWidth={'md'}
      fullScreen={fullScreen}
    >
      <DialogTitle sx={{ fontVariant: 'small-caps', fontSize: '1.7em' }}>
        {isImportingData ? 'Importing' : 'Import Data'}
      </DialogTitle>

      {renderBody()}

      {renderDialogActions()}
    </Dialog>
  );
}

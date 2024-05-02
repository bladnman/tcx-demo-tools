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
import useSettingsStore from '@pages/telemetry-viewer-page/store/settings-store/useSettingsStore.ts';
import { ChangeEvent, useCallback, useEffect, useRef } from 'react';

import { HStack, VStack } from '@common/mui-stacks.tsx';
import TelemetryList from '@pages/telemetry-viewer-page/features/main-body/features/telemetry-list/TelemetryList.tsx';
import CallMergeIcon from '@mui/icons-material/CallMerge';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import { actionSetAllEventsAndRecalculateFilters } from '@pages/telemetry-viewer-page/store/event-store/actions/actionSetAllEventsAndRecalculateFilters.ts';
import actionSetImportingEvents from '@pages/telemetry-viewer-page/store/settings-store/actions/actionSetImportingEvents.ts';
import actionSetIsImportDialogOpen from '@pages/telemetry-viewer-page/store/settings-store/actions/actionSetIsImportDialogOpen.ts';
import eventMapper from '@pages/telemetry-viewer-page/classes/telemetry-receiver/eventMapper.ts';
import updateTVWithNewTV from '@pages/telemetry-viewer-page/utils/event-utils/updateTVWithNewTV.ts';
import useEventStore, {
  useSequences,
} from '@pages/telemetry-viewer-page/store/event-store/useEventStore.ts';
import actionSetIsImportingData from '@pages/telemetry-viewer-page/store/settings-store/actions/actionSetIsImportingData.ts';
import actionClearSequences from '@pages/telemetry-viewer-page/store/event-store/actions/actionClearSequences.ts';
import actionSetImportingSequences from '@pages/telemetry-viewer-page/store/settings-store/actions/actionSetImportingSequences.ts';
import { actionSetSequences } from '@pages/telemetry-viewer-page/store/event-store/actions/actionSetSequences.ts';
import actionMergeEvents from '@pages/telemetry-viewer-page/store/event-store/actions/actionMergeEvents.ts';
export default function ImportDialog() {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const isImportDialogOpen = useSettingsStore((state) => state.isImportDialogOpen);
  const importingEvents = useSettingsStore((state) => state.importingEvents);
  const isImportingData = useSettingsStore((state) => state.isImportingData);
  const importingSequences = useSettingsStore((state) => state.importingSequences);

  const sequences = useSequences();

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
    [handleClose, importingEvents, importingSequences],
  );

  useEffect(() => {
    const allEvents = useEventStore.getState().allEvents;
    // AUTO IMPORT
    if (!!importingEvents && allEvents?.length < 1) {
      doImport(importingEvents, false);
    }
  }, [handleClose, importingEvents, doImport]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const contents = e.target?.result;

        // map everything coming in
        const { events: importedEvents, sequences: importedSequences } = eventMapper(
          JSON.parse(contents as string),
          sequences,
        );

        // NOT A PROPER FILE
        if (
          !importedEvents ||
          !Array.isArray(importedEvents) ||
          importedEvents.length === 0
        )
          return; // TODO: message this to user

        // we will map all imported events into
        // this new array. (this allows us to update, or de-dupe)
        const newEvents: TVEvent[] = [];

        // loop through all the imported events to de-dupe
        for (const event of importedEvents) {
          const previousEvent = newEvents.find((e) => e.id === event.id);
          // EXISTING - update the existing event
          if (previousEvent) {
            updateTVWithNewTV(previousEvent, event);
          }
          // NEW
          else {
            newEvents.push(event);
          }
        }

        newEvents.sort((a, b) => a.timeMs - b.timeMs);
        actionSetImportingEvents(newEvents);
        actionSetImportingSequences(importedSequences);
      };
      reader.readAsText(file);
    }
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
            <TelemetryList
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

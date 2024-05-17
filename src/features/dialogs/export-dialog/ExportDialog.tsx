import { HStack, VStack } from '@common/mui-stacks.tsx';
import downloadEvents from '@dialogs/export-dialog/utils/downloadEvents.ts';
import CheckIcon from '@mui/icons-material/Check';
import DownloadIcon from '@mui/icons-material/Download';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import useEventStore from '@store/event-store/useEventStore.ts';
import actionSetIsExportDialogOpen from '@store/settings-store/actions/actionSetIsExportDialogOpen.ts';
import useSettingsStore from '@store/settings-store/useSettingsStore.ts';
import { useState } from 'react';

export default function ExportDialog() {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const isExportDialogOpen = useSettingsStore((state) => state.isExportDialogOpen);
  const [fileName, setFileName] = useState('events');

  const [exportOption, setExportOption] = useState<'include_all' | 'include_filtered'>(
    'include_all',
  );
  const isIncludeAll = exportOption === 'include_all';

  const [eventFormatOption, setEventFormatOption] = useState<'twiz' | 'raw'>('twiz');
  const isEventFormatAll = eventFormatOption === 'twiz';

  const [fileFormatOption, setFileFormatOption] = useState<'json' | 'csv'>('json');
  const isFileFormatJson = fileFormatOption === 'json';

  const handleClose = () => {
    actionSetIsExportDialogOpen(false);
  };
  const handleExportClick = () => {
    const events = isIncludeAll
      ? useEventStore.getState().allEvents
      : useEventStore.getState().displayEvents;
    downloadEvents(events, fileFormatOption, eventFormatOption, fileName);
    handleClose();
  };
  const leftColumnSx = {
    width: '18em',
    flexShrink: 0,
  };

  return (
    <Dialog
      onClose={handleClose}
      open={isExportDialogOpen}
      maxWidth={'md'}
      fullScreen={fullScreen}
    >
      <DialogTitle>Export</DialogTitle>
      <DialogContent>
        <VStack left spacing={1}>
          <HStack spacing={2}>
            <HStack sx={leftColumnSx}>
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
                    setTimeout(() => handleExportClick(), 100);
                  }
                }}
              />
              <Typography>{isFileFormatJson ? '.json' : '.csv'}</Typography>
            </HStack>
            <Typography>Filename for these events.</Typography>
          </HStack>

          {/* INCLUDE */}
          <HStack left spacing={2}>
            <ToggleButtonGroup
              value={exportOption}
              exclusive
              onChange={(_, value) => setExportOption(value)}
              sx={leftColumnSx}
            >
              <ToggleButton value="include_all" sx={{ whiteSpace: 'nowrap' }}>
                <HStack>{isIncludeAll && <CheckIcon />} All Data</HStack>
              </ToggleButton>
              <ToggleButton value="include_filtered" sx={{ whiteSpace: 'nowrap' }}>
                <HStack>{!isIncludeAll && <CheckIcon />} Filtered Data</HStack>
              </ToggleButton>
            </ToggleButtonGroup>

            <Typography>
              {isIncludeAll && `Export all events.`}
              {!isIncludeAll &&
                `Export only filtered events. Generally this mean only 
                the items you can see in the "Timeline" view at this moment.`}
            </Typography>
          </HStack>

          {/* EVENT FORMAT */}
          <HStack left spacing={2}>
            <ToggleButtonGroup
              value={eventFormatOption}
              exclusive
              onChange={(_, value) => setEventFormatOption(value)}
              sx={leftColumnSx}
            >
              <ToggleButton value="twiz" sx={{ whiteSpace: 'nowrap' }}>
                <HStack>{isEventFormatAll && <CheckIcon />} TWiz Events</HStack>
              </ToggleButton>
              <ToggleButton value="raw" sx={{ whiteSpace: 'nowrap' }}>
                <HStack>{!isEventFormatAll && <CheckIcon />} Raw Events</HStack>
              </ToggleButton>
            </ToggleButtonGroup>

            <Typography>
              {isEventFormatAll &&
                `Data will include "TWiz Event" format. 
                This is all of the data used in this tool and the best option 
                if you want full fidelity when importing here later.`}
              {!isEventFormatAll &&
                `Format of the data will be only the "rawEvent" data. 
                This will drop a few UT-type fields (payloads, filtered, etc.)
                and export a smaller file. Not as good if you want to import back here.`}
            </Typography>
          </HStack>

          {/* FILE FORMAT */}
          <HStack left spacing={2}>
            <ToggleButtonGroup
              value={fileFormatOption}
              exclusive
              onChange={(_, value) => setFileFormatOption(value)}
              sx={leftColumnSx}
            >
              <ToggleButton value="json" sx={{ whiteSpace: 'nowrap' }}>
                <HStack>{isFileFormatJson && <CheckIcon />} JSON</HStack>
              </ToggleButton>
              <ToggleButton value="csv" sx={{ whiteSpace: 'nowrap' }}>
                <HStack>{!isFileFormatJson && <CheckIcon />} CSV</HStack>
              </ToggleButton>
            </ToggleButtonGroup>

            <Typography>
              {isFileFormatJson &&
                `File format is in JSON. This allows for the highest fidelity.`}
              {!isFileFormatJson &&
                `The CSV file format will flatten much of the data. This is best used
                in conjunction with the "raw events" format option.`}
            </Typography>
          </HStack>
        </VStack>
      </DialogContent>
      <DialogActions>
        {/*@ts-expect-error : using my own colors*/}
        <Button onClick={handleClose} color={'cancel'}>
          Cancel
        </Button>
        <Button onClick={handleExportClick} disabled={fileName.trim() === ''}>
          <DownloadIcon />
          Export
        </Button>
      </DialogActions>
    </Dialog>
  );
}

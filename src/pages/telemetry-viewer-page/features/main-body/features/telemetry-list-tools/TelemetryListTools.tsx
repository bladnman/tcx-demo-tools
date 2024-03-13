import { HStack } from '../../../../../../common/mui-stacks.tsx';
import useTelemetryStore from '@pages/telemetry-viewer-page/store/useTelemetryStore.ts';
import { Button, FormControlLabel, Switch } from '@mui/material';
import EventTypeAutocomplete from '@pages/telemetry-viewer-page/features/main-body/features/telemetry-list-tools/EventTypeAutocomplete.tsx';
import TelemetryPublisher from '@pages/telemetry-viewer-page/features/TelemetryPublisher.tsx';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
export default function TelemetryListTools() {
  const {
    allowWrap,
    setAllowWrap,
    eventTypeFilter,
    setEventTypeFilter,
    clearDisplayEvents,
  } = useTelemetryStore();
  return (
    <HStack spacing={2} sx={{ px: 1 }} hFill hAlign={'leading'}>
      <TelemetryPublisher />
      <FormControlLabel
        control={
          <Switch
            checked={allowWrap}
            onChange={() => setAllowWrap(!allowWrap)}
          />
        }
        label="Wrap"
      />
      <EventTypeAutocomplete
        onChange={setEventTypeFilter}
        eventCodeFilter={eventTypeFilter}
        placeholder={
          eventTypeFilter.length < 1 ? 'No type filter' : 'Filtered to'
        }
        label="Event Type Filter"
      />
      <Button
        variant="contained"
        color={'bg'}
        onClick={() => clearDisplayEvents()}
        startIcon={<DeleteForeverIcon />}
        sx={{ flexShrink: 0 }}
      >
        Clear
      </Button>
    </HStack>
  );
}

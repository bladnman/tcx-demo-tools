import { HStack } from '@components/mui-stacks.tsx';
import useTelemetryStore from '@pages/telemetry-viewer-page/store/useTelemetryStore.ts';
import { FormControlLabel, Switch } from '@mui/material';
import EventTypeAutocomplete from '@pages/telemetry-viewer-page/features/telemetry-list/features/telemetry-list-tools/EventTypeAutocomplete.tsx';
import TelemetryPublisher from '@pages/telemetry-viewer-page/features/TelemetryPublisher.tsx';

export default function TelemetryListTools() {
  const { allowWrap, setAllowWrap } = useTelemetryStore();
  const { eventTypeFilter, setEventTypeFilter } = useTelemetryStore();
  return (
    <HStack spacing={2} sx={{ px: 1 }}>
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
    </HStack>
  );
}

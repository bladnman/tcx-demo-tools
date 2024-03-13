import { VStack } from '@components/mui-stacks.tsx';
import useTelemetryStore from '@pages/telemetry-viewer-page/store/useTelemetryStore.ts';
import TelemetryRow from '@pages/telemetry-viewer-page/features/telemetry-list/features/telemetry-row/TelemetryRow.tsx';
import { getEventDef } from '@pages/telemetry-viewer-page/features/telemetry-list/features/telemetry-row/utils/telemetry-utils.ts';

export default function TelemetryList() {
  const { displayEvents, eventTypeFilter } = useTelemetryStore();
  const { eventForDetails, setEventForDetails } = useTelemetryStore();
  const filteredEvents = displayEvents.filter((event) => {
    if (eventTypeFilter.length < 1) {
      return true;
    }
    const eventDef = getEventDef(event);
    return eventTypeFilter.includes(eventDef.type);
  });

  return (
    <VStack
      hFill
      vAlign={'leading'}
      hAlign={'leading'}
      spacing={0}
      sx={{ maxWidth: '90vw' }}
    >
      {filteredEvents.map((event, index) => (
        <TelemetryRow
          key={index}
          event={event}
          selected={eventForDetails === event}
          onClick={() => {
            setEventForDetails(eventForDetails === event ? null : event);
          }}
        />
      ))}
    </VStack>
  );
}

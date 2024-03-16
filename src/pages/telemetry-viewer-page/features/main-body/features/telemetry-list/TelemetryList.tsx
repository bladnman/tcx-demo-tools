import { VStack } from '@common/mui-stacks.tsx';
import useTelemetryStore from '@pages/telemetry-viewer-page/store/useTelemetryStore.ts';
import TelemetryRow from '@pages/telemetry-viewer-page/features/main-body/features/telemetry-list/features/telemetry-row/TelemetryRow.tsx';

export default function TelemetryList() {
  const { displayEvents } = useTelemetryStore();
  const { eventForDetails, setEventForDetails } = useTelemetryStore();

  return (
    <VStack
      hFill
      vAlign={'leading'}
      hAlign={'leading'}
      spacing={0}
      sx={{ maxWidth: '90vw' }}
    >
      {displayEvents.map((event, index) => (
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

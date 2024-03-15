import TelemetryToken from '@pages/telemetry-viewer-page/features/main-body/features/telemetry-list/features/telemetry-row/common/telemetry-token/TelemetryToken.tsx';
import { getEventDef } from '@pages/telemetry-viewer-page/features/main-body/features/telemetry-list/features/telemetry-row/utils/telemetry-utils.ts';
import EventIcon from '@pages/telemetry-viewer-page/features/main-body/features/telemetry-list/features/telemetry-row/common/telemetry-token/features/event-icon/EventIcon.tsx';
import EventDetails from '@pages/telemetry-viewer-page/features/main-body/features/telemetry-list/features/telemetry-row/common/telemetry-token/features/event-details/EventDetails.tsx';

export default function TelemetryEventToken({
  event,
}: {
  event: TelemetryEventMessage;
}) {
  const eventDef = getEventDef(event);
  const colorMode = 'dual';

  return (
    <TelemetryToken
      eventIcon={<EventIcon event={event} fontSize={'1em'} />}
      eventDetails={<EventDetails event={event} colorMode={colorMode} />}
      eventColor={eventDef.color}
      eventTag={eventDef.abbreviation}
      fontSize={'1.0em'}
      colorMode={colorMode}
    />
  );
}

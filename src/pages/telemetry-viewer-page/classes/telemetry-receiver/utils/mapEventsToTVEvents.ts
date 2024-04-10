import mapClientEventToTV, {
  isClientEvent,
} from '@pages/telemetry-viewer-page/classes/telemetry-receiver/utils/mapClientEventToTV.ts';
import mapTDDispatchedToTV, {
  isTDDispatchedEvent,
} from '@pages/telemetry-viewer-page/classes/telemetry-receiver/utils/mapTDDispatchedToTV.ts';

export default function mapEventsToTVEvents(events: unknown[]): TVEvent[] {
  return events.map(mapEvent).filter((e) => e !== null) as TVEvent[];
}
function mapEvent(event: unknown): TVEvent | null {
  if (!event) return null;

  if (isClientEvent(event)) return mapClientEventToTV(event);
  if (isTDDispatchedEvent(event)) return mapTDDispatchedToTV(event);

  // try any client event sent
  const { clientEvent } = event as Hash;
  if (isClientEvent(clientEvent)) return mapClientEventToTV(clientEvent);

  const { dispatchedEvents = [] } = (event as Hash) ?? {};
  if (dispatchedEvents.length) {
    const dispatchedEvent = dispatchedEvents[0];
    if (isTDDispatchedEvent(dispatchedEvent))
      return mapTDDispatchedToTV(dispatchedEvent);
  }

  console.log(`[🐽](mapEventsToTVEvents) UNMAPPED event`, event);
  return null;
}

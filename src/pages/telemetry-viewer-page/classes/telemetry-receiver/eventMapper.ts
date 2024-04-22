import mapClientEventToTV, {
  isClientEvent,
} from '@pages/telemetry-viewer-page/classes/telemetry-receiver/utils/mapClientEventToTV.ts';
import mapTDDispatchedToTV, {
  isTDDispatchedEvent,
} from '@pages/telemetry-viewer-page/classes/telemetry-receiver/utils/mapTDDispatchedToTV.ts';
import mapTVEventToTV, {
  isTVEvent,
} from '@pages/telemetry-viewer-page/classes/telemetry-receiver/utils/mapTVEventToTV.ts';
import mapUpgradeTVEventToTV, {
  isOldTVEvent,
} from '@pages/telemetry-viewer-page/classes/telemetry-receiver/utils/mapUpgradeTVEventToTV.ts';

export default function eventMapper(events: unknown[]): TVEvent[] {
  return events.map(mapEvent).filter((e) => e !== null) as TVEvent[];
}
function mapEvent(event: unknown): TVEvent | null {
  if (!event) return null;
  if (isTVEvent(event)) return mapTVEventToTV(event);
  if (isOldTVEvent(event)) return mapUpgradeTVEventToTV(event);
  if (isClientEvent(event)) return mapClientEventToTV(event);
  if (isTDDispatchedEvent(event)) return mapTDDispatchedToTV(event);

  // look for an explicit ".clientEvent"
  const { clientEvent } = event as Hash;
  if (isClientEvent(clientEvent)) return mapClientEventToTV(clientEvent);

  const { dispatchedEvents = [] } = (event as Hash) ?? {};
  if (dispatchedEvents.length) {
    const dispatchedEvent = dispatchedEvents[0];
    if (isTDDispatchedEvent(dispatchedEvent)) return mapTDDispatchedToTV(dispatchedEvent);
  }

  console.warn(`[🐽](eventMapper) UNMAPPED event`, event);
  return null;
}

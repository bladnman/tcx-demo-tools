import mapClientEventToTV, {
  isClientEvent,
} from '@src/receiver/classes/telemetry-receiver/utils/mapClientEventToTV.ts';
import mapTDDispatchedToTV, {
  isTDDispatchedEvent,
} from '@src/receiver/classes/telemetry-receiver/utils/mapTDDispatchedToTV.ts';
import mapTVEventToTV, {
  isTVEvent,
} from '@src/receiver/classes/telemetry-receiver/utils/mapTVEventToTV.ts';
import mapUpgradeTVEventToTV, {
  isOldTVEvent,
} from '@src/receiver/classes/telemetry-receiver/utils/mapUpgradeTVEventToTV.ts';

export default function mapRawEvent(event: unknown): TVEvent | null {
  if (!event) return null;
  const getTvEvent = (event: unknown): TVEvent | null => {
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
      if (isTDDispatchedEvent(dispatchedEvent))
        return mapTDDispatchedToTV(dispatchedEvent);
    }

    return null;
  };

  // GET A TV EVENT from the event object
  const tvEvent = getTvEvent(event);

  // NOT A TV EVENT
  if (!tvEvent) {
    console.warn(`[🐽](eventMapper) UNMAPPED event`, event);
    return null;
  }

  // VERIFY WE HAVE AT LEAST 1 EVENT
  // const lastEvent = tvEvent.dispatchedEvents.at(-1)?.inputEvent;
  if (!tvEvent.dispatchedEvents.at(-1)?.inputEvent && !tvEvent.clientEvent) {
    console.warn(`[🐽](eventMapper) NO EVENT INFORMATION`, tvEvent);
    return null;
  }

  return tvEvent;
}

import mapClientEventToTV, { isClientEvent } from './utils/mapClientEventToTV.ts';
import mapTDDispatchedToTV, { isTDDispatchedEvent } from './utils/mapTDDispatchedToTV.ts';
import mapTVEventToTV, { isTVEvent } from './utils/mapTVEventToTV.ts';
import mapUpgradeTVEventToTV, { isOldTVEvent } from './utils/mapUpgradeTVEventToTV.ts';
import eventSynthesizer from './eventSynthesizer.ts';
import eventSequencer from './utils/sequencer/event-sequencer.ts';

export default function eventMapper(events: unknown[], sequences: Sequences) {
  const tvEvents = events.map(mapEvent).filter((e) => e !== null) as TVEvent[];

  // SYNTHESIZE EVENTS
  eventSynthesizer(tvEvents);

  const processedSequences = eventSequencer(tvEvents, sequences ?? {});
  const didSequencesChange = processedSequences !== sequences;

  // TODO: 🐽 testing only
  if (didSequencesChange) {
    console.log(`[🐽](eventMapper) sequences`, sequences);
  }

  return {
    events: tvEvents,
    sequences: didSequencesChange ? processedSequences : sequences,
  };
}

//
// HELPER FUNCTIONS
function mapEvent(event: unknown): TVEvent | null {
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

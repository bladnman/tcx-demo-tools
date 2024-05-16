import TWEvent from '@classes/data/TWEvent.ts';
import mapClientEventToTW from '@classes/telemetry-receiver/utils/tw-mappers/mapClientEventToTW.ts';
import mapTDDispatchedToTW from '@classes/telemetry-receiver/utils/tw-mappers/mapTDDispatchedToTW.ts';
import mapTVEventToTW from '@classes/telemetry-receiver/utils/tw-mappers/mapTVEventToTW.ts';
import mapTWEventToTW from '@classes/telemetry-receiver/utils/tw-mappers/mapTWEventToTW.ts';
import mapUpgradeTWEventToTW from '@classes/telemetry-receiver/utils/tw-mappers/mapUpgradeTWEventToTW.ts';

type MapperFn = (event: unknown) => TWEvent | null;

// NOTE: Order matters
const pipeline: MapperFn[] = [
  mapTWEventToTW,
  mapTVEventToTW,
  mapTDDispatchedToTW,
  mapClientEventToTW,
  mapUpgradeTWEventToTW,
];

export default function eventMapper(events: unknown[], sequences: Sequences) {
  // MAP TO TV EVENTS
  // const tvEvents = events.map(mapRawEvent).filter((e) => e !== null) as TVEvent[];
  const twEvents = events
    .map((event) => {
      for (const mapper of pipeline) {
        const twEvent = mapper(event);
        if (twEvent) return twEvent;
      }
      console.warn(`[🐽](eventMapper) UNMAPPED event`, event);
      return null;
    })
    .filter((e) => e !== null) as TWEvent[];

  console.log(`[🐽](eventMapper) twEvents`, twEvents);

  // SYNTHESIZE EVENTS - add props (e.g. tvVersion, timeMs ...)
  // eventSynthesizer(tvEvents); // todo: remove (not needed with TWEvents)
  //
  // // TAG EVENTS
  // eventTagger(tvEvents);
  //
  // // SEQUENCE EVENTS
  // const processedSequences = eventSequencer(tvEvents, sequences ?? {});
  // const didSequencesChange = processedSequences !== sequences;

  // RETURN
  return {
    events: twEvents,
    sequences,
    // sequences: didSequencesChange ? processedSequences : sequences,
  };
}

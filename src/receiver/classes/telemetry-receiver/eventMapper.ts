import TWEvent from '@classes/data/TWEvent.ts';
import eventSequencer from '@src/receiver/classes/telemetry-receiver/eventSequencer.ts';
import eventTagger from '@src/receiver/classes/telemetry-receiver/eventTagger.ts';
import mapClientEventToTW from '@src/receiver/classes/telemetry-receiver/utils/tw-mappers/mapClientEventToTW.ts';
import mapMerlinEventToTW from '@src/receiver/classes/telemetry-receiver/utils/tw-mappers/mapMerlinEventToTW.ts';
import mapTDDispatchedToTW from '@src/receiver/classes/telemetry-receiver/utils/tw-mappers/mapTDDispatchedToTW.ts';
import mapTVEventToTW from '@src/receiver/classes/telemetry-receiver/utils/tw-mappers/mapTVEventToTW.ts';
import mapTWEventToTW from '@src/receiver/classes/telemetry-receiver/utils/tw-mappers/mapTWEventToTW.ts';
import mapUpgradeTWEventToTW from '@src/receiver/classes/telemetry-receiver/utils/tw-mappers/mapUpgradeTWEventToTW.ts';

type MapperFn = (event: unknown) => TWEvent | null;

// NOTE: Order matters
const pipeline: MapperFn[] = [
  mapTWEventToTW,
  mapTVEventToTW,
  mapTDDispatchedToTW,
  mapClientEventToTW,
  mapMerlinEventToTW,
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

  // TAG EVENTS
  eventTagger(twEvents);

  // SEQUENCE EVENTS
  const processedSequences = eventSequencer(twEvents, sequences ?? {});
  const didSequencesChange = processedSequences !== sequences;

  // RETURN
  return {
    events: twEvents,
    sequences: didSequencesChange ? processedSequences : sequences,
  };
}

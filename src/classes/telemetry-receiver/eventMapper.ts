import eventSequencer from '@classes/telemetry-receiver/eventSequencer.ts';
import eventTagger from '@classes/telemetry-receiver/eventTagger.ts';
import mapRawEvent from '@classes/telemetry-receiver/utils/mapRawEventToTV.ts';
import eventSynthesizer from './eventSynthesizer.ts';

export default function eventMapper(events: unknown[], sequences: Sequences) {
  // MAP TO TV EVENTS
  const tvEvents = events.map(mapRawEvent).filter((e) => e !== null) as TVEvent[];

  // SYNTHESIZE EVENTS - add props (e.g. tvVersion, timeMs ...)
  eventSynthesizer(tvEvents);

  // TAG EVENTS
  eventTagger(tvEvents);

  // SEQUENCE EVENTS
  const processedSequences = eventSequencer(tvEvents, sequences ?? {});
  const didSequencesChange = processedSequences !== sequences;

  // RETURN
  return {
    events: tvEvents,
    sequences: didSequencesChange ? processedSequences : sequences,
  };
}

import TWEvent from '@classes/data/TWEvent.ts';

export default function cleanForExport(events: TWEvent[]): Partial<TWEvent>[] {
  // remove all .sequenceData from the events
  return events.map((event) => {
    const cleanEvent = { ...event };
    delete cleanEvent.twSequenceData;
    return cleanEvent;
  });
}

import TWEvent from '@classes/data/TWEvent.ts';

export default function cleanForExport(events: TWEvent[]): string {
  // remove all .sequenceData from the events
  const cleanEvents = events.map((event) => {
    const cleanEvent = { ...event };
    delete cleanEvent.twSequenceData;
    return cleanEvent;
  });

  return JSON.stringify(cleanEvents, null, 2);
}

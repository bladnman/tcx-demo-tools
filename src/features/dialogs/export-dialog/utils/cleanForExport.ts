export default function cleanForExport(events: TVEvent[]): string {
  // remove all .sequenceData from the events
  const cleanEvents = events.map((event) => {
    const cleanEvent = { ...event };
    delete cleanEvent.sequenceData;
    return cleanEvent;
  });

  return JSON.stringify(cleanEvents, null, 2);
}

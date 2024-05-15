export default function cleanForImport(json: string): unknown[] {
  const rawEvents = JSON.parse(json);

  // remove all .sequenceData from the events
  // this could still be there from a previous export
  const cleanEvents = rawEvents.map((cleanEvent: Hash) => {
    delete cleanEvent.sequenceData;
    return cleanEvent;
  });

  // order things by time
  const firstEvent = cleanEvents[0];
  if (!firstEvent) return [];

  // make sure the first event has a time
  // field we are willing to sort by
  if (firstEvent.timeMs || firstEvent.timestamp) {
    cleanEvents.sort((a: Hash, b: Hash) => {
      const aTime = a.timeMs || new Date(a.timestamp).getTime();
      const bTime = b.timeMs || new Date(b.timestamp).getTime();
      return aTime - bTime;
    });
  }

  return cleanEvents;
}

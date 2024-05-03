export default function getEventsFromReceivedData(
  data: TVEvent | TVEvent[],
): TVEvent[] {
  if (!Array.isArray(data)) {
    data = [data];
  }

  const newEvents: TVEvent[] = [];

  data.forEach((event) => {
    // LOAD TIME EVENTS -- explode into multiple allEvents
    if (event.type !== 'LoadTime') {
      newEvents.push(event);
    }
    // LOAD TIME EVENTS -- explode into multiple allEvents
    else {
      const origMetricsData = event?.clientEvent?.metricsData;
      // bail if it doesn't look right
      if (!origMetricsData) return [event];

      const syntheticEvents: TVEvent[] = [];
      origMetricsData.forEach((metric: Hash) => {
        const clientEvent = event?.clientEvent ?? {};
        const syntheticEvent = {
          ...event,
          _synthetic: true,
          final: {
            ...clientEvent,
            metricsData: [metric],
          },
        };
        syntheticEvents.push(syntheticEvent as TVEvent);
      });
      // order the exploded allEvents by
      // event.final.metricsData[0].startTime
      syntheticEvents.sort((a, b) => {
        const aStart = a?.clientEvent?.metricsData[0]?.startTime ?? 0;
        const bStart = b?.clientEvent?.metricsData[0]?.startTime ?? 0;
        const aDuration = a?.clientEvent?.metricsData[0]?.latency ?? 0;
        const bDuration = b?.clientEvent?.metricsData[0]?.latency ?? 0;
        if (aStart === bStart) {
          return aDuration - bDuration;
        }
        return aStart - bStart;
      });

      newEvents.push(...syntheticEvents);
    }
  });

  return newEvents;
}

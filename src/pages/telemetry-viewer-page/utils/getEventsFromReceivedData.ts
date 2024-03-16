export default function getEventsFromReceivedData(
  data: TelemetryEventMessage | TelemetryEventMessage[],
): TelemetryEventMessage[] {
  if (!Array.isArray(data)) {
    data = [data];
  }

  const newEvents: TelemetryEventMessage[] = [];

  data.forEach((event) => {
    // LOAD TIME EVENTS -- explode into multiple allEvents
    if (event.type !== 'LoadTime') {
      newEvents.push(event);
    }
    // LOAD TIME EVENTS -- explode into multiple allEvents
    else {
      const origMetricsData = event.final?.metricsData;
      // bail if it doesn't look right
      if (!origMetricsData) return [event];

      const syntheticEvents: TelemetryEventMessage[] = [];
      origMetricsData.forEach((metric: Hash) => {
        const syntheticEvent = {
          ...event,
          _synthetic: true,
          final: {
            ...event.final,
            metricsData: [metric],
          },
        };
        syntheticEvents.push(syntheticEvent as TelemetryEventMessage);
      });
      // order the exploded allEvents by
      // event.final.metricsData[0].startTime
      syntheticEvents.sort((a, b) => {
        const aStart = a.final?.metricsData[0]?.startTime ?? 0;
        const bStart = b.final?.metricsData[0]?.startTime ?? 0;
        const aDuration = a.final?.metricsData[0]?.latency ?? 0;
        const bDuration = b.final?.metricsData[0]?.latency ?? 0;
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

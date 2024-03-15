export default function getEventsFromReceivedData(
  data: TelemetryEventMessage,
): TelemetryEventMessage[] {
  // LOAD TIME EVENTS -- explode into multiple events
  if (data.type === 'LoadTime') {
    const origMetricsData = data.final?.metricsData;
    // bail if it doesn't look right
    if (!origMetricsData) return [data];

    const syntheticEvents: TelemetryEventMessage[] = [];
    origMetricsData.forEach((metric: Hash) => {
      const syntheticEvent = {
        ...data,
        _synthetic: true,
        final: {
          ...data.final,
          metricsData: [metric],
        },
      };
      syntheticEvents.push(syntheticEvent as TelemetryEventMessage);
    });
    // order the exploded events by
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
    return syntheticEvents.reverse();
  }

  return [data];
}

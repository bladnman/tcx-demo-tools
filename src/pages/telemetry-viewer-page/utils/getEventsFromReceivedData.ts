export default function getEventsFromReceivedData(
  data: TelemetryEventMessage,
): TelemetryEventMessage[] {
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
    return syntheticEvents as TelemetryEventMessage[];
  }

  return [data];
}

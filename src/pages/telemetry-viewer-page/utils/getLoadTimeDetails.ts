import formatMilliseconds from '@utils/formatMilliseconds.ts';

export function getLoadTimeDetails(event: TVEvent) {
  if (event.type !== 'LoadTime') return null;

  const metrics: MetricData[] = [];

  // DISPATCHED EVENTS
  if (event.dispatchedEvents.length) {
    for (const dispatchedEvent of event.dispatchedEvents) {
      if (dispatchedEvent.inputEvent?.metricsData) {
        metrics.push(...(dispatchedEvent.inputEvent.metricsData ?? []));
      }
    }
  }
  // CLIENT EVENT
  else {
    if (event.clientEvent?.metricsData) {
      metrics.push(...(event.clientEvent?.metricsData ?? []));
    }
  }

  if (!metrics.length) return null;
  const firstMetric: MetricData = metrics[0];

  // find the item in event.clientEvent.metricsData
  // that has the 'metric' value of 'timeToInteractive'
  const ttiMetric: MetricData | undefined = metrics.find(
    (m: { metric: string }) => m.metric === 'timeToInteractive',
  );

  let message = ttiMetric?.metric ?? firstMetric?.metric;

  if (!message) return null;

  if (metrics.length > 1) {
    message = `${message} [+${metrics.length - 1}]`;
  }

  const highlight = formatMilliseconds(
    ttiMetric?.latency ?? firstMetric?.latency ?? 0,
  );

  return {
    highlight,
    message,
    metrics,
  };
}

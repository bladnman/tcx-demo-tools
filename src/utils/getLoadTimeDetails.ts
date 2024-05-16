import TWEvent from '@classes/data/TWEvent.ts';
import formatMilliseconds from '@utils/formatMilliseconds.ts';

export function getLoadTimeDetails(event: TWEvent) {
  if (event.twType !== 'LoadTime') return null;

  const metrics = event.get('metricsData') as MetricData[] | undefined;
  if (!metrics) return null;

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

  const highlight = formatMilliseconds(ttiMetric?.latency ?? firstMetric?.latency ?? 0);

  return {
    highlight,
    message,
    metrics,
  };
}

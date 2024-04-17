import { useMemo } from 'react';
import { getLoadTimeDetails } from '@pages/telemetry-viewer-page/utils/getLoadTimeDetails.ts';
import { HStack, VStack } from '@common/mui-stacks.tsx';
import { Typography } from '@mui/material';
import { EVENT_TYPE_DEF } from '@pages/telemetry-viewer-page/constants/EVENT_TYPE.ts';
import { EventTypes } from '@pages/telemetry-viewer-page/types/event-types.ts';
import formatMilliseconds from '@utils/formatMilliseconds.ts';

export default function SumLoadTimeMetricList({
  event,
}: SummaryVisualizationProps) {
  const eventColor = EVENT_TYPE_DEF[event.type as EventTypes].color;
  const { metrics } = useMemo(() => {
    const data = getLoadTimeDetails(event);
    if (!data?.metrics.length) return { metrics: [] };

    // order metrics by latency
    data.metrics.sort((a, b) => a.latency - b.latency);
    return data;
  }, [event]);

  if (!metrics?.length) return null;
  const minLatency = metrics[0].latency;
  const maxLatency = metrics[metrics.length - 1].latency;

  return (
    <VStack hFill left spacing={0} sx={{ position: 'relative' }}>
      {metrics.map((metric, idx) => {
        const isTti = metric.metric.includes('imeToInteractive');
        return (
          <VStack
            key={`${event.id}${metric.metric}${metric.latency}${idx}`}
            hFill
            left
            spacing={0}
            sx={{ position: 'relative', height: '1.1em' }}
          >
            <HStack hFill left sx={{ zIndex: 1, position: 'absolute' }}>
              <TimelineDot
                color={isTti ? 'appOrange.main' : 'appMint.main'}
                value={metric.latency}
                minValue={minLatency}
                maxValue={maxLatency}
              />
            </HStack>
            <HStack
              hFill
              left
              key={metric.metric}
              sx={{ zIndex: 2, position: 'absolute' }}
            >
              <HStack right sx={{ minWidth: '4.5em' }} data-id={'value'}>
                <Typography
                  sx={{
                    fontSize: '0.9em',
                    color: isTti ? 'appOrange.main' : `${eventColor}.main`,
                  }}
                >
                  {formatMilliseconds(metric.latency)}
                </Typography>
              </HStack>
              <HStack
                left
                hFill
                sx={{
                  overflow: 'hidden',
                }}
              >
                <Typography
                  sx={{
                    fontSize: '0.9em',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                  title={metric.metric}
                >
                  {metric.metric}
                </Typography>
              </HStack>
              <HStack
                right
                sx={
                  {
                    // overflow: 'hidden',
                  }
                }
              >
                {metric.metricSegment && (
                  <Typography
                    sx={{
                      fontSize: '0.9em',
                      color: 'fg35.main',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {metric.metricSegment}
                  </Typography>
                )}
              </HStack>
            </HStack>
          </VStack>
        );
      })}
    </VStack>
  );
}
function TimelineDot({
  color,
  value,
  minValue,
  maxValue,
  size = '0.25em',
}: {
  color: string;
  value: number;
  minValue: number;
  maxValue: number;
  size?: string;
}) {
  const percent = ((value - minValue) / (maxValue - minValue)) * 100;
  return (
    <div
      style={{
        height: size,
        position: 'relative',
        width: '100%',
      }}
    >
      <HStack
        sx={{
          width: size,
          height: size,
          position: 'absolute',
          backgroundColor: color,
          left: `${percent}%`,
          borderRadius: '50%',
          zIndex: 2,
        }}
      />
    </div>
  );
}

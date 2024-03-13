import { HStack } from '@components/mui-stacks.tsx';
import { Chip, ChipOwnProps, Typography } from '@mui/material';
import EventChipIcon from '@pages/telemetry-viewer-page/features/telemetry-list/features/telemetry-row/features/EventChipIcon.tsx';
import EventShortDescription from '@pages/telemetry-viewer-page/features/telemetry-list/features/telemetry-row/features/EventShortDescription.tsx';
import { getEventDef } from '@pages/telemetry-viewer-page/features/telemetry-list/features/telemetry-row/utils/telemetry-utils.ts';
import formatMilliseconds from '@utils/formatMilliseconds.ts';

export default function TelemetryRowBodyLoadTime({
  event,
}: {
  event: TelemetryEventMessage;
}) {
  const eventDef = getEventDef(event);
  const metric = event.final.metricsData?.[0];

  if (!metric) {
    return (
      <HStack>
        <Chip
          label={eventDef.abbreviation}
          size={'small'}
          color={eventDef.color as ChipOwnProps['color']}
          sx={{ width: '7em', flexShrink: 0 }}
          icon={<EventChipIcon event={event} />}
        />
        <Typography fontWeight={'bold'}>No metrics</Typography>
        <EventShortDescription event={event} />
      </HStack>
    );
  }

  return (
    <HStack>
      {/*{eventDef.icon}*/}
      <Chip
        label={eventDef.abbreviation}
        size={'small'}
        color={eventDef.color as ChipOwnProps['color']}
        sx={{ width: '7em', flexShrink: 0 }}
        icon={<EventChipIcon event={event} />}
      />
      <Typography color={'warning.main'}>
        {formatMilliseconds(metric.latency)}
      </Typography>
      <Typography color={'secondary'}>{metric.metric}</Typography>
      <Typography variant={'caption'} fontStyle={'italic'}>
        {metric.metricGroup}
      </Typography>
    </HStack>
  );
}

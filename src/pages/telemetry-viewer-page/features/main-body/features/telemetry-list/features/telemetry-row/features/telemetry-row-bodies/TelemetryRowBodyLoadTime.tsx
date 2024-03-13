import { HStack } from '../../../../../../../../../../common/mui-stacks.tsx';
import { Chip, ChipOwnProps, Typography } from '@mui/material';
import EventChipIcon from '@pages/telemetry-viewer-page/features/main-body/features/telemetry-list/features/telemetry-row/features/EventChipIcon.tsx';
import EventShortDescription from '@pages/telemetry-viewer-page/features/main-body/features/telemetry-list/features/telemetry-row/features/EventShortDescription.tsx';
import { getEventDef } from '@pages/telemetry-viewer-page/features/main-body/features/telemetry-list/features/telemetry-row/utils/telemetry-utils.ts';
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
    <HStack spacing={0}>
      <Chip
        label={eventDef.abbreviation}
        size={'small'}
        color={eventDef.color as ChipOwnProps['color']}
        sx={{ width: '7em', flexShrink: 0, zIndex: 2, py: 1.7 }}
        icon={<EventChipIcon event={event} />}
      />
      <HStack
        sx={{
          paddingRight: 1,
          paddingLeft: 5,
          marginLeft: -4,
          backgroundColor: 'bg.dark',
          borderRadius: '1em',
          // borderColor: 'success.main',
          borderColor: 'bg.light',
          borderWidth: 1,
          borderStyle: 'solid',
          zIndex: 1,
        }}
      >
        <Typography color={'warning.main'}>
          {formatMilliseconds(metric.latency)}
        </Typography>
        <Typography color={'secondary'}>{metric.metric}</Typography>
      </HStack>
    </HStack>
  );
}

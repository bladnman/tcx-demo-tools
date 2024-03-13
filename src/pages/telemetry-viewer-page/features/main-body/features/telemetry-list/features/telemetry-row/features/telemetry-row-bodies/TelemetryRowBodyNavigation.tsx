import { HStack } from '../../../../../../../../../../common/mui-stacks.tsx';
import { Chip, ChipOwnProps, Typography } from '@mui/material';
import EventChipIcon from '@pages/telemetry-viewer-page/features/main-body/features/telemetry-list/features/telemetry-row/features/EventChipIcon.tsx';
import {
  getEventDef,
  getSimpleSceneName,
} from '@pages/telemetry-viewer-page/features/main-body/features/telemetry-list/features/telemetry-row/utils/telemetry-utils.ts';

export default function TelemetryRowBodyNavigation({
  event,
}: {
  event: TelemetryEventMessage;
}) {
  const eventDef = getEventDef(event);
  const simpleScene = getSimpleSceneName(event.final.locationScene);

  return (
    <HStack>
      <Chip
        label={eventDef.abbreviation}
        size={'small'}
        color={eventDef.color as ChipOwnProps['color']}
        sx={{ width: '7em', flexShrink: 0 }}
        icon={<EventChipIcon event={event} />}
      />
      <HStack
        sx={{
          px: 1,
          backgroundColor: 'info.main',
          borderRadius: '0.25em',
        }}
      >
        <Typography variant={'caption'} color={'bg.light'}>
          location:
        </Typography>
        <Typography fontWeight={'bolder'} color={'bg.main'}>
          {simpleScene}
        </Typography>
      </HStack>
    </HStack>
  );
}

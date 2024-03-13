import { HStack } from '../../../../../../../../../../common/mui-stacks.tsx';
import { Chip, ChipOwnProps } from '@mui/material';
import EventChipIcon from '@pages/telemetry-viewer-page/features/main-body/features/telemetry-list/features/telemetry-row/features/EventChipIcon.tsx';
import EventShortDescription from '@pages/telemetry-viewer-page/features/main-body/features/telemetry-list/features/telemetry-row/features/EventShortDescription.tsx';
import { getEventDef } from '@pages/telemetry-viewer-page/features/main-body/features/telemetry-list/features/telemetry-row/utils/telemetry-utils.ts';

export default function TelemetryRowBodyStandard({
  event,
}: {
  event: TelemetryEventMessage;
}) {
  const eventDef = getEventDef(event);

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

      <EventShortDescription event={event} />
    </HStack>
  );
}

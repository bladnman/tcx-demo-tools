import { HStack } from '@components/mui-stacks.tsx';
import { getEventDef } from '@pages/telemetry-viewer-page/features/telemetry-list/features/telemetry-row/utils/telemetry-utils.ts';
import { Chip, ChipOwnProps } from '@mui/material';
import EventChipIcon from '@pages/telemetry-viewer-page/features/telemetry-list/features/telemetry-row/features/EventChipIcon.tsx';
import EventShortDescription from '@pages/telemetry-viewer-page/features/telemetry-list/features/telemetry-row/features/EventShortDescription.tsx';

export default function TelemetryRow({
  event,
  onClick,
  selected = false,
}: {
  event: TelemetryEventMessage;
  onClick?: () => void;
  selected?: boolean;
}) {
  const eventDef = getEventDef(event);
  return (
    <HStack
      hFill
      hAlign={'leading'}
      vAlign={'leading'}
      spacing={1}
      sx={{
        px: 1,
        py: 0.5,
        wordBreak: 'break-word',
        cursor: 'pointer',
        backgroundColor: selected ? 'primary.main' : 'transparent',
      }}
      onClick={onClick}
    >
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

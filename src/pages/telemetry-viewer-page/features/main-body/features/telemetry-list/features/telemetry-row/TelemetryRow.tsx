import TelemetryEventToken from '@pages/telemetry-viewer-page/common/telemetry-token/TelemetryEventToken.tsx';
import { HStack } from '@common/mui-stacks';

export default function TelemetryRow({
  event,
  onClick,
  selected = false,
}: {
  event: TelemetryEventMessage;
  onClick?: () => void;
  selected?: boolean;
}) {
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
      <TelemetryEventToken event={event} />
    </HStack>
  );
}

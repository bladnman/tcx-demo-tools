import { HStack } from '@components/mui-stacks.tsx';
import TelemetryRowBodyStandard from '@pages/telemetry-viewer-page/features/telemetry-list/features/telemetry-row/features/telemetry-row-bodies/TelemetryRowBodyStandard.tsx';
import TelemetryRowBodyLoadTime from '@pages/telemetry-viewer-page/features/telemetry-list/features/telemetry-row/features/telemetry-row-bodies/TelemetryRowBodyLoadTime.tsx';
import TelemetryRowBodyNavigation from '@pages/telemetry-viewer-page/features/telemetry-list/features/telemetry-row/features/telemetry-row-bodies/TelemetryRowBodyNavigation.tsx';

export default function TelemetryRow({
  event,
  onClick,
  selected = false,
}: {
  event: TelemetryEventMessage;
  onClick?: () => void;
  selected?: boolean;
}) {
  const RenderRowBody = () => {
    switch (event.type) {
      case 'LoadTime':
        return <TelemetryRowBodyLoadTime event={event} />;
      case 'Navigation':
        return <TelemetryRowBodyNavigation event={event} />;
      default:
        return <TelemetryRowBodyStandard event={event} />;
    }
  };
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
      {RenderRowBody()}
    </HStack>
  );
}

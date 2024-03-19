import TelemetryEventToken from '@pages/telemetry-viewer-page/common/telemetry-token/TelemetryEventToken.tsx';
import { HStack, StackProps } from '@common/mui-stacks';

interface TelemetryRowProps extends StackProps {
  event: TelemetryEventMessage;
  onClick?: () => void;
  selected?: boolean;
}
export default function TelemetryRow(props: TelemetryRowProps) {
  const { event, onClick, selected = false, sx: inSx, ...otherProps } = props;
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
        ...inSx,
      }}
      onClick={onClick}
      data-id={'telemetry-row'}
      {...otherProps}
    >
      <TelemetryEventToken event={event} />
    </HStack>
  );
}

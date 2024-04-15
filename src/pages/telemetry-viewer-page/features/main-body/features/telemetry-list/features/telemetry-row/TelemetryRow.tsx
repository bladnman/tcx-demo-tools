import TelemetryEventToken from '@pages/telemetry-viewer-page/common/telemetry-token/TelemetryEventToken.tsx';
import { HStack, StackProps } from '@common/mui-stacks';
import EventTimeDisplay from '@pages/telemetry-viewer-page/features/main-body/features/telemetry-list/features/telemetry-row/features/EventTimeDisplay.tsx';
import { usePopupState } from 'material-ui-popup-state/hooks';
import RowContextMenu from '@pages/telemetry-viewer-page/features/main-body/features/telemetry-list/features/telemetry-row/features/row-context-menu/RowContextMenu.tsx';

interface TelemetryRowProps extends StackProps {
  event: TVEvent;
  onClick?: () => void;
  selected?: boolean;
}
export default function TelemetryRow(props: TelemetryRowProps) {
  const { event, onClick, selected = false, sx: inSx, ...otherProps } = props;
  const contextPopupState = usePopupState({
    variant: 'popover',
    popupId: 'event-row-context-menu',
  });
  return (
    <HStack hFill left>
      <HStack
        hFill
        left
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
        onContextMenu={(e) => {
          e.preventDefault();
          contextPopupState.open(e);
        }}
      >
        <EventTimeDisplay event={event} />
        <TelemetryEventToken event={event} />
      </HStack>
      <RowContextMenu event={event} popupState={contextPopupState} />
    </HStack>
  );
}

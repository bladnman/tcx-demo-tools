import TelemetryEventToken from '@pages/telemetry-viewer-page/common/telemetry-token/TelemetryEventToken.tsx';
import { HStack } from '@common/mui-stacks';
import EventTimeDisplay from '@pages/telemetry-viewer-page/features/main-body/features/telemetry-list/features/telemetry-row/features/EventTimeDisplay.tsx';
import React, { useMemo } from 'react';

interface TelemetryRowProps {
  event: TVEvent;
  selected?: boolean;
  onClick?: (id: string) => void;
  onContextClick?: (e: React.MouseEvent, event: TVEvent) => void;
}
export default function TelemetryRow(props: TelemetryRowProps) {
  const { event, onClick, selected = false, onContextClick } = props;
  return useMemo(() => {
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
          }}
          onClick={() => onClick?.(event.id)}
          data-id={'telemetry-row'}
          onContextMenu={(e) => {
            e.preventDefault();
            onContextClick?.(e, event);
          }}
        >
          <EventTimeDisplay event={event} />
          <TelemetryEventToken event={event} />
        </HStack>
      </HStack>
    );
  }, [event, selected, onClick, onContextClick]);
}

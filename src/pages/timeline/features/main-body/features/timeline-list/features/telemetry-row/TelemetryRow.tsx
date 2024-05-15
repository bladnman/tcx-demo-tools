import EventToken from '@common/event-token/EventToken.tsx';
import { HStack } from '@common/mui-stacks';
import { SxProps } from '@mui/material';
import EventTimeDisplay from '@pages/timeline/features/main-body/features/timeline-list/features/telemetry-row/features/EventTimeDisplay.tsx';
import React, { useMemo } from 'react';

interface TelemetryRowProps {
  event: TVEvent;
  selected?: boolean;
  onClick?: (id: string) => void;
  onContextClick?: (e: React.MouseEvent, event: TVEvent) => void;
  rowSx?: SxProps;
  tokenSx?: SxProps;
}
export default function TelemetryRow(props: TelemetryRowProps) {
  const {
    event,
    onClick,
    selected = false,
    onContextClick,
    rowSx = {},
    tokenSx = {},
  } = props;
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
            ...rowSx,
          }}
          onClick={() => onClick?.(event.id)}
          data-id={'telemetry-row'}
          onContextMenu={(e) => {
            e.preventDefault();
            onContextClick?.(e, event);
          }}
        >
          <EventTimeDisplay event={event} />
          <EventToken event={event} sx={tokenSx} />
        </HStack>
      </HStack>
    );
  }, [selected, rowSx, event, tokenSx, onClick, onContextClick]);
}

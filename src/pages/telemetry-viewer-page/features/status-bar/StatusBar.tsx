import { HStack } from '@common/mui-stacks.tsx';
import StatusEventTotals from '@pages/telemetry-viewer-page/features/status-bar/features/StatusEventTotals.tsx';
import StatusMessage from '@pages/telemetry-viewer-page/features/status-bar/features/status-message/StatusMessage.tsx';
import { useMemo } from 'react';

export default function StatusBar({ height = '2.5em' }: { height?: string }) {
  return useMemo(() => {
    const sectionSx = {
      overflow: 'hidden',
      minWidth: '20%',
    };
    return (
      <HStack
        hFill
        left
        spaceBetween
        spacing={3}
        sx={{
          height: height,
          px: 2,
          borderTopStyle: 'solid',
          borderTopWidth: '1px',
          borderTopColor: 'divider',
        }}
      >
        <HStack spacing={2} left data-id={'status-left'} sx={sectionSx}>
          <StatusMessage />
        </HStack>
        <HStack spacing={2} right data-id={'status-right'} sx={sectionSx}>
          <StatusEventTotals />
        </HStack>
      </HStack>
    );
  }, [height]);
}

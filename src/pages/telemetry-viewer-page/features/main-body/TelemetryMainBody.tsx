import TelemetryList from '@pages/telemetry-viewer-page/features/main-body/features/telemetry-list/TelemetryList.tsx';
import { HStack, VStack } from '@common/mui-stacks.tsx';
import TelemetryListTools from '@pages/telemetry-viewer-page/features/main-body/features/action-bar/TelemetryListTools.tsx';
import useTelemetryStore from '@pages/telemetry-viewer-page/store/useTelemetryStore.ts';
import useAutoScroll from '@pages/telemetry-viewer-page/hooks/useAutoScroll.ts';
import { useEffect } from 'react';

export default function TelemetryMainBody() {
  const { appBarHeight, displayEvents, filters } = useTelemetryStore();
  const { containerRef, scrollToBottom } = useAutoScroll({
    scrollThreshold: 150,
  });
  useEffect(() => {
    scrollToBottom();
  }, [displayEvents, filters, scrollToBottom]);
  const bodyTopPoint = appBarHeight * 2 + 10;
  return (
    <VStack
      data-id={'telemetry-main-body'}
      fill
      vAlign={'leading'}
      hAlign={'leading'}
      sx={{
        position: 'absolute',
        overflow: 'hidden',
        top: `${bodyTopPoint}px`,
        height: `calc(100vh - ${bodyTopPoint}px)`,
        left: 0,
        right: 0,
      }}
      spacing={0}
    >
      <HStack
        hFill
        spacing={2}
        vAlign={'leading'}
        hAlign={'leading'}
        sx={{
          position: 'fixed',
          top: `${appBarHeight - 1}px`,
          width: '100%',
          backgroundColor: 'bg.dark',
          py: 1,
        }}
      >
        <TelemetryListTools />
      </HStack>

      <VStack
        fill
        vAlign={'leading'}
        hAlign={'leading'}
        sx={{
          px: 1,
          overflow: 'auto',
        }}
        ref={containerRef}
      >
        <TelemetryList />
      </VStack>
    </VStack>
  );
}

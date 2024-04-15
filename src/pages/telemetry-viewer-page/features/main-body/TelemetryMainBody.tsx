import TelemetryList from '@pages/telemetry-viewer-page/features/main-body/features/telemetry-list/TelemetryList.tsx';
import { VStack } from '@common/mui-stacks.tsx';
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
  const bodyTopPoint = appBarHeight + 10;

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
        <TelemetryList events={displayEvents} />
      </VStack>
    </VStack>
  );
}

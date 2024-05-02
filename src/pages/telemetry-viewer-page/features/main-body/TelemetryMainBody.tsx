import TelemetryList from '@pages/telemetry-viewer-page/features/main-body/features/telemetry-list/TelemetryList.tsx';
import { VStack } from '@common/mui-stacks.tsx';
import useSettingsStore from '@pages/telemetry-viewer-page/store/settings-store/useSettingsStore.ts';
import useAutoScroll from '@pages/telemetry-viewer-page/hooks/useAutoScroll.ts';
import { useEffect } from 'react';
import {
  useDisplayEvents,
  useFilters,
} from '@pages/telemetry-viewer-page/store/event-store/useEventStore.ts';

export default function TelemetryMainBody() {
  const displayEvents = useDisplayEvents();
  const filters = useFilters();
  const { appBarHeight } = useSettingsStore();
  const { containerRef, scrollToBottom } = useAutoScroll({
    scrollThreshold: 150,
  });
  useEffect(() => {
    scrollToBottom();
  }, [displayEvents, filters, scrollToBottom]);

  return (
    <VStack
      data-id={'telemetry-main-body'}
      topLeft
      sx={{
        position: 'absolute',
        overflow: 'hidden',
        top: `${appBarHeight}px`,
        bottom: 0,
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

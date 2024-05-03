import { VStack } from '@common/mui-stacks.tsx';
import useAutoScroll from '@hooks/useAutoScroll.ts';
import TimelineList from '@pages/timeline/features/main-body/features/timeline-list/TimelineList.tsx';
import { useDisplayEvents, useFilters } from '@store/event-store/useEventStore.ts';
import useSettingsStore from '@store/settings-store/useSettingsStore.ts';
import { useEffect } from 'react';
// import AppInstanceList from '@pages/telemetry-viewer-page/features/main-body/features/app-instance-list/AppInstanceList.tsx';

export default function TimelineMainBody() {
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
        <TimelineList events={displayEvents} />
        {/*<AppInstanceList />*/}
      </VStack>
    </VStack>
  );
}

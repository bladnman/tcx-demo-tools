import { useEffect, useMemo, useState } from 'react';
import TCxMockPublisher from '@tcx-hosted/tcx/TCxMockPublisher.ts';
import useSettingsStore from '@store/settings-store/useSettingsStore.ts';
import actionSetMockIsPaused from '@store/settings-store/actions/actionSetMockIsPaused.ts';

export default function useTCxMockPublisher(
  onData: (data: unknown) => void,
  data?: unknown[],
) {
  const mockBatchSize = useSettingsStore((state) => state.mockBatchSize);
  const mockBatchDelayMs = useSettingsStore((state) => state.mockBatchDelayMs);
  const mockAutoPause = useSettingsStore((state) => state.mockAutoPause);
  const mockIsPaused = useSettingsStore((state) => state.mockIsPaused);

  const [, forceUpdate] = useState({});

  const publisher = useMemo(
    () => {
      return TCxMockPublisher.getInstance({
        data: data ?? [],
        onData,
        delayMs: mockBatchDelayMs,
        batchSize: mockBatchSize,
        autoPause: mockAutoPause,
        onStateChange: (publisher: TCxMockPublisher) => {
          actionSetMockIsPaused(!publisher.isRunning);
          forceUpdate({});
        },
      });
    },
    // no dependency array - no updates needed
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useEffect(() => {
    return () => {
      publisher.stop();
    };
  }, [publisher]);

  useEffect(() => {
    if (mockIsPaused) {
      publisher.stop();
    } else {
      publisher.start();
    }
  }, [mockIsPaused]);

  useEffect(() => {
    const movedToAutoPause = mockAutoPause && !publisher.autoPause;
    const movedToManual = !mockAutoPause && publisher.autoPause;

    publisher.autoPause = mockAutoPause;
    publisher.batchSize = mockBatchSize;
    publisher.delayMs = mockBatchDelayMs;

    // changed to auto-pause mode
    if (movedToAutoPause) {
      publisher.stop();
    } else if (movedToManual && !mockIsPaused) {
      publisher.start();
    }
  }, [mockBatchSize, data, mockBatchDelayMs, mockAutoPause, publisher]);

  // BATCH SIZE CHANGES
  useEffect(() => {
    publisher.batchSize = mockBatchSize;
  }, [mockBatchSize, publisher]);

  return publisher;
}

import { useEffect, useMemo, useState } from 'react';
import TCxMockPublisher from '@tcx-hosted/tcx/TCxMockPublisher.ts';
import useSettingsStore from '@store/settings-store/useSettingsStore.ts';
import actionSetMockIsPaused from '@store/settings-store/actions/actionSetMockIsPaused.ts';

export default function useTCxMockPublisher(
  onData: (data: unknown) => void,
  data?: unknown[],
) {
  const { mockBatchSize, mockBatchDelayMs, mockAutoPause, mockIsPaused } =
    useSettingsStore();
  const [, forceUpdate] = useState({});

  const publisher = useMemo(() => {
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
  }, [mockBatchSize, data, mockBatchDelayMs, mockAutoPause, onData]);

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

  // BATCH SIZE CHANGES
  useEffect(() => {
    publisher.batchSize = mockBatchSize;
  }, [mockBatchSize, publisher]);

  return publisher;
}

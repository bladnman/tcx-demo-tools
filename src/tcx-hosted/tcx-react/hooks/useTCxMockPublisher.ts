import { useMemo, useState } from 'react';
import TCxMockPublisher from '@tcx-hosted/tcx/TCxMockPublisher.ts';

export default function useTCxMockPublisher<T>(
  onData: (data: T) => void,
  delayMs: number,
  batchSize: number,
  data?: T[],
) {
  const [, forceUpdate] = useState({});
  return useMemo(() => {
    return new TCxMockPublisher<T>(data ?? [], onData, delayMs, batchSize, () => {
      forceUpdate({});
    });
  }, [batchSize, data, delayMs, onData]);
}

import { useState } from 'react';
import TCxMockPublisher from '@tcx-hosted/tcx/TCxMockPublisher.ts';

export default function useTCxMockPublisher<T>(
  onData: (data: T) => void,
  delayMs: number,
  data?: T[],
) {
  const [publisher] = useState(
    new TCxMockPublisher<T>(data ?? [], onData, delayMs),
  );
  return publisher;
}

import getTvFilteredEvent from '@utils/event-utils/getTvFilteredEvent.ts';
import getTvInputEvent from '@utils/event-utils/getTvInputEvent.ts';
import { detailedDiff } from 'deep-object-diff';
import { useMemo } from 'react';

export default function useEventDiffs(event: TVEvent) {
  return useMemo(() => {
    const diff = detailedDiff(
      getTvInputEvent(event) ?? {},
      getTvFilteredEvent(event) ?? {},
    );
    const hasDiffs =
      Object.keys(diff.added).length > 0 ||
      Object.keys(diff.deleted).length > 0 ||
      Object.keys(diff.updated).length > 0;
    return {
      ...diff,
      hasDiffs,
    };
  }, [event]);
}

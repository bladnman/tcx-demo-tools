import TWEvent from '@classes/data/TWEvent.ts';
import { detailedDiff } from 'deep-object-diff';
import { useMemo } from 'react';

export default function useEventDiffs(event: TWEvent) {
  return useMemo(() => {
    const diff = detailedDiff(event.rawEvent ?? {}, event.filtered ?? {});
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

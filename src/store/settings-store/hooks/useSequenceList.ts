import useEventStore from '@store/event-store/useEventStore.ts';
import { useEffect, useState } from 'react';

export default function useSequenceList(sequenceKey: string): Sequence[] {
  const sequences = useEventStore((state) => state.sequences);
  const [sequenceList, setSequenceList] = useState<Sequence[]>([]);

  useEffect(() => {
    const currentSeqList = sequences[sequenceKey];
    if (!currentSeqList || currentSeqList.length < 1) return;
    if (currentSeqList === sequenceList) return;

    setSequenceList(currentSeqList);
  }, [sequenceList, sequences]);

  return sequenceList;
}

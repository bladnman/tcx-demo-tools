import useEventStore from '@store/event-store/useEventStore.ts';
import { useEffect, useState } from 'react';
import AppInstanceSequencerEngine from '@classes/sequencers/engines/AppInstanceSequencerEngine.ts';

export default function useAppInstanceSequences() {
  const sequences = useEventStore((state) => state.sequences);
  const [sequenceList, setSequenceList] = useState<Sequence[]>([]);

  useEffect(() => {
    const currentSeqList = sequences[AppInstanceSequencerEngine.sequenceKey];
    if (!currentSeqList || currentSeqList.length < 1) return;
    if (currentSeqList === sequenceList) return;

    setSequenceList(currentSeqList);
  }, [sequenceList, sequences]);

  return sequenceList;
}
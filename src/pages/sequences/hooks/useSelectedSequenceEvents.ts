import { useAllEvents } from '@store/event-store/useEventStore.ts';
import useSettingsStore from '@store/settings-store/useSettingsStore.ts';
import { useMemo } from 'react';

export default function useSelectedSequenceEvents() {
  const selectedSequence = useSettingsStore((state) => state.selectedSequence);
  const allEvents = useAllEvents();
  return useMemo(() => {
    if (!selectedSequence || !allEvents) return null;
    return allEvents.filter((event) => {
      if (!event.twSequenceData) return false;
      const seqData = event.twSequenceData as Hash;
      const belongsToSeqList = (seqData[selectedSequence.sequenceType] as string[]) ?? [];
      return belongsToSeqList.includes(selectedSequence.id);
    });
  }, [allEvents, selectedSequence]);
}

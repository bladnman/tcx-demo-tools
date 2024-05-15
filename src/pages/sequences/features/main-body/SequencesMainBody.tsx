import { VStack } from '@common/mui-stacks.tsx';
import useScrollToEventRow from '@hooks/useScrollToEventRow.ts';
import useSelectedSequenceEvents from '@pages/sequences/hooks/useSelectedSequenceEvents.ts';
import TimelineList from '@pages/timeline/features/main-body/features/timeline-list/TimelineList.tsx';
import { useAllEvents } from '@store/event-store/useEventStore.ts';
import useSettingsStore from '@store/settings-store/useSettingsStore.ts';
import isEventWithinSequenceTime from '@utils/event-utils/isEventWithinSequenceTime.ts';
import { useCallback, useEffect } from 'react';

export default function SequencesMainBody() {
  const allEvents = useAllEvents();
  const displayEvents = useSelectedSequenceEvents();
  const scrollToEventRow = useScrollToEventRow();
  const selectedSequence = useSettingsStore((state) => state.selectedSequence);

  const gutterWidthEm = 0.5;

  const generateTokenSx = useCallback(
    (event: TVEvent) => {
      const notIncluded = Boolean(displayEvents && !displayEvents.includes(event));
      return notIncluded ? { opacity: 0.5 } : null;
    },
    [displayEvents],
  );
  const generateRowSx = useCallback(
    (event: TVEvent) => {
      let color = 'transparent';
      if (displayEvents && selectedSequence) {
        const notIncluded = Boolean(displayEvents && !displayEvents.includes(event));
        if (notIncluded) {
          const withinTime = isEventWithinSequenceTime(event, selectedSequence);
          // we don't include the "closing" event in the sequence
          // this event is actually explicitly not part of the sequence
          const isLastEvent = event.id === selectedSequence.endEventId;
          color = withinTime && !isLastEvent ? 'fg35.main' : 'transparent';
        } else {
          color = 'fg75.main';
        }
      }
      return {
        pl: 3,
        borderLeftStyle: `solid`,
        borderLeftWidth: `${gutterWidthEm}em`,
        borderLeftColor: color,
      };
    },
    [displayEvents, selectedSequence],
  );

  useEffect(() => {
    if (selectedSequence) {
      scrollToEventRow(selectedSequence.beginEventId);
    }
  }, [scrollToEventRow, selectedSequence]);

  return (
    <VStack topLeft fill data-id={'sequences-page'} sx={{ overflow: 'auto', px: 1 }}>
      <TimelineList
        events={allEvents}
        generateTokenSx={generateTokenSx}
        generateRowSx={generateRowSx}
      />
    </VStack>
  );
}

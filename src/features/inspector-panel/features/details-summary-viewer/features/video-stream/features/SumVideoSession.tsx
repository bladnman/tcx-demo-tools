import { HStack, VStack } from '@common/mui-stacks.tsx';
import FIELD_DEF from '@const/FIELD_DEF.ts';
import { SummaryVisualizationProps } from '@features/inspector-panel/features/details-summary-viewer/types';
import useEventColor from '@hooks/useEventColor.ts';
import { Typography } from '@mui/material';
import { useAllEvents } from '@store/event-store/useEventStore.ts';
import getEventDescriptions from '@utils//event-utils/getEventDescriptions.ts';
import { useMemo } from 'react';

export default function SumVideoSession({ event }: SummaryVisualizationProps) {
  const eventColor = useEventColor(event);
  const allEvents = useAllEvents();
  const summaryEvents = useMemo(() => {
    const videoSessionId = event.getStr(FIELD_DEF.videoSessionId.paths);
    return allEvents.filter(
      (tempEvent) => tempEvent.getStr(FIELD_DEF.videoSessionId.paths) === videoSessionId,
    );
  }, [allEvents, event]);

  const appSx = {
    fontSize: '0.75em',
    color: `${eventColor}.main`,
    whiteSpace: 'nowrap',
    minWidth: '5.5em',
  };
  const locationSx = {
    fontSize: '0.75em',
  };

  return (
    <VStack hFill left sx={{ pt: 2 }} spacing={0}>
      <HStack>
        <Typography sx={{ fontWeight: 'bold', fontSize: '1.2em' }}>
          Video Session
        </Typography>
      </HStack>
      {summaryEvents.map((prevEvent) => {
        const value = prevEvent.getStr(FIELD_DEF.videoEventType.paths);
        const eventDesc = getEventDescriptions(prevEvent);

        const isThisEvent = prevEvent.twId === event.twId;
        return (
          <HStack
            hFill
            topLeft
            sx={{ pl: 0, fontWeight: isThisEvent ? 'bold' : 'normal' }}
            key={prevEvent.twId}
          >
            <Typography sx={{ fontWeight: isThisEvent ? 'bold' : 'normal', ...appSx }}>
              {value}
            </Typography>
            <Typography
              sx={{
                fontWeight: isThisEvent ? 'bold' : 'normal',
                ...locationSx,
              }}
            >
              {eventDesc.message}
            </Typography>
          </HStack>
        );
      })}
    </VStack>
  );
}

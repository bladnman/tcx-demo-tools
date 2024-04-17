import { HStack, VStack } from '@common/mui-stacks.tsx';
import getObjectValue from '@pages/telemetry-viewer-page/utils/getObjectValue.ts';
import FIELD_DEF from '@pages/telemetry-viewer-page/constants/FIELD_DEF.ts';
import { Typography } from '@mui/material';
import { useMemo } from 'react';
import { EVENT_TYPE_DEF } from '@pages/telemetry-viewer-page/constants/EVENT_TYPE.ts';
import { EventTypes } from '@pages/telemetry-viewer-page/types/event-types.ts';
import getEventDescriptions from '@pages/telemetry-viewer-page/utils/event-utils/getEventDescriptions.ts';
import { useAllEvents } from '@pages/telemetry-viewer-page/store/event-store/useEventStore.ts';
export default function SumVideoSession({ event }: SummaryVisualizationProps) {
  const eventColor = EVENT_TYPE_DEF[event.type as EventTypes].color;
  const allEvents = useAllEvents();
  const summaryEvents = useMemo(() => {
    const videoSessionId = getObjectValue(
      event,
      FIELD_DEF.videoSessionId.paths,
    );
    return allEvents.filter((tempEvent) => {
      return (
        getObjectValue(tempEvent, FIELD_DEF.videoSessionId.paths) ===
        videoSessionId
      );
    });
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
        const value = getObjectValue(prevEvent, FIELD_DEF.videoEventType.paths);
        const eventDesc = getEventDescriptions(prevEvent);

        const isThisEvent = prevEvent.id === event.id;
        return (
          <HStack
            hFill
            topLeft
            sx={{ pl: 0, fontWeight: isThisEvent ? 'bold' : 'normal' }}
            key={prevEvent.id}
          >
            <Typography
              sx={{ fontWeight: isThisEvent ? 'bold' : 'normal', ...appSx }}
            >
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

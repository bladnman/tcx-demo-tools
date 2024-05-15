import { HStack, VStack } from '@common/mui-stacks.tsx';
import FIELD_DEF from '@const/FIELD_DEF.ts';
import { Typography } from '@mui/material';
import { useMemo } from 'react';
import { EVENT_TYPE_DEF } from '@const/EVENT_TYPE.ts';
import { EventTypes } from '@const/event-types.ts';
import getEventDescriptions from '@utils//event-utils/getEventDescriptions.ts';
import { useAllEvents } from '@store/event-store/useEventStore.ts';
import getObjectValueFromFieldDef from '@utils//object-value-utils/getObjectValueFromFieldDef.ts';
export default function SumVideoSession({ event }: SummaryVisualizationProps) {
  const eventColor = EVENT_TYPE_DEF[event.type as EventTypes].color;
  const allEvents = useAllEvents();
  const summaryEvents = useMemo(() => {
    const videoSessionId = getObjectValueFromFieldDef(event, FIELD_DEF.videoSessionId);
    return allEvents.filter((tempEvent) => {
      return (
        getObjectValueFromFieldDef(tempEvent, FIELD_DEF.videoSessionId) === videoSessionId
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
        const value = getObjectValueFromFieldDef(prevEvent, FIELD_DEF.videoEventType);
        const eventDesc = getEventDescriptions(prevEvent);

        const isThisEvent = prevEvent.id === event.id;
        return (
          <HStack
            hFill
            topLeft
            sx={{ pl: 0, fontWeight: isThisEvent ? 'bold' : 'normal' }}
            key={prevEvent.id}
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

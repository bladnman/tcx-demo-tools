import { HStack, VStack } from '@common/mui-stacks.tsx';
import FIELD_DEF from '@pages/telemetry-viewer-page/constants/FIELD_DEF.ts';
import { Button, Typography } from '@mui/material';
import { getPreviousItems } from '@pages/telemetry-viewer-page/utils/telemetry-utils.ts';
import { useMemo, useState } from 'react';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { EVENT_TYPE_DEF } from '@pages/telemetry-viewer-page/constants/EVENT_TYPE.ts';
import { EventTypes } from '@pages/telemetry-viewer-page/constants/event-types.ts';
import { useAllEvents } from '@pages/telemetry-viewer-page/store/event-store/useEventStore.ts';
import getObjectValueFromFieldDef from '@pages/telemetry-viewer-page/utils/object-value-utils/getObjectValueFromFieldDef.ts';
export default function SumHistoryLastX({
  event,
  x = 6,
}: SummaryVisualizationProps & { x?: number }) {
  const [maxToShow, setMaxToShow] = useState(x);
  const allEvents = useAllEvents();
  const previousNavEvents = useMemo(() => {
    return getPreviousItems(allEvents, event).filter(
      (event) => event.type === 'Navigation' || event.type === 'Interaction',
    );
    // intentionally omitting allEvents from deps
    // no need to recalculate when we get newer events
    // this display only cares about previous events
  }, [event]);

  const lastXEvents = useMemo(() => {
    const startIndex = Math.max(0, previousNavEvents.length - maxToShow);
    return previousNavEvents.slice(startIndex);
  }, [maxToShow, previousNavEvents]);

  const isAllPrevious = lastXEvents.length === previousNavEvents.length;

  return (
    <VStack hFill left sx={{ pt: 2 }} spacing={0}>
      <HStack>
        <Typography sx={{ fontWeight: 'bold', fontSize: '1.2em' }}>
          Quick History
        </Typography>
        {!isAllPrevious && (
          <Button onClick={() => setMaxToShow(maxToShow + 1)}>
            <ExpandLessIcon />
            more
          </Button>
        )}
      </HStack>
      {lastXEvents.map((prevEvent, idx) => {
        const eventColor = EVENT_TYPE_DEF[prevEvent.type as EventTypes].color;
        const appSx = {
          fontSize: '0.75em',
          whiteSpace: 'nowrap',
          color: `${eventColor}.main`,
          minWidth: '5.5em',
        };
        const locationSx = {
          fontSize: '0.75em',
        };

        const appName = getObjectValueFromFieldDef(prevEvent, FIELD_DEF.appName);
        const description = getObjectValueFromFieldDef(
          prevEvent,
          prevEvent.type === 'Navigation'
            ? FIELD_DEF.locationScene
            : FIELD_DEF.interactAction,
        );

        const isLast = idx === lastXEvents.length - 1;
        return (
          <HStack
            hFill
            topLeft
            sx={{ pl: 0, fontWeight: isLast ? 'bold' : 'normal' }}
            key={prevEvent.id}
          >
            <Typography
              sx={{
                fontWeight: isLast ? 'bold' : 'normal',
                ...appSx,
              }}
            >
              {appName}
            </Typography>
            <Typography sx={{ fontWeight: isLast ? 'bold' : 'normal', ...locationSx }}>
              {description}
            </Typography>
            {prevEvent === event && (
              <FmdGoodIcon sx={{ fontSize: '1.5em', color: 'appGreen.main' }} />
            )}
          </HStack>
        );
      })}
    </VStack>
  );
}

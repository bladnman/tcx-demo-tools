import { HStack, VStack } from '@common/mui-stacks.tsx';
import { EventTypes } from '@const/event-types.ts';
import { EVENT_TYPE_DEF } from '@const/EVENT_TYPE.ts';
import FIELD_DEF from '@const/FIELD_DEF.ts';
import { SummaryVisualizationProps } from '@features/inspector-panel/features/details-summary-viewer/types';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import { Button, Typography } from '@mui/material';
import { useAllEvents } from '@store/event-store/useEventStore.ts';
import { getPreviousItems } from '@utils//telemetry-utils.ts';
import { useMemo, useState } from 'react';

export default function SumHistoryLastX({
  event,
  x = 6,
}: SummaryVisualizationProps & { x?: number }) {
  const [maxToShow, setMaxToShow] = useState(x);
  const allEvents = useAllEvents();
  const previousNavEvents = useMemo(() => {
    return getPreviousItems(allEvents, event).filter(
      (event) => event.twType === 'Navigation' || event.twType === 'Interaction',
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
        const eventColor = EVENT_TYPE_DEF[prevEvent.twType as EventTypes]?.color ?? 'fg';
        const appSx = {
          fontSize: '0.75em',
          whiteSpace: 'nowrap',
          color: `${eventColor}.main`,
          minWidth: '5.5em',
        };
        const locationSx = {
          fontSize: '0.75em',
        };

        const appName = prevEvent.appName;
        const description = prevEvent.getStr(
          prevEvent.twType === 'Navigation'
            ? FIELD_DEF.locationScene.paths
            : FIELD_DEF.interactAction.paths,
        );

        const isLast = idx === lastXEvents.length - 1;
        return (
          <HStack
            hFill
            topLeft
            sx={{ pl: 0, fontWeight: isLast ? 'bold' : 'normal' }}
            key={prevEvent.twId}
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

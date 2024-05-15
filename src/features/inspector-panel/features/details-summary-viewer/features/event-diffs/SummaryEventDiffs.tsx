import CollapsableContainer from '@common/CollapsableContainer.tsx';
import { VStack } from '@common/mui-stacks.tsx';
import { Typography } from '@mui/material';
import useEventDiffs from '@features/inspector-panel/features/details-summary-viewer/features/event-diffs/hooks/useEventDiffs.ts';
import EventRawViewer from '@features/inspector-panel/features/event-raw-viewer/EventRawViewer.tsx';

export default function SummaryEventDiffs({ event }: { event: TVEvent }) {
  const eventDiffs = useEventDiffs(event);

  const renderBody = () => {
    return eventDiffs.hasDiffs ? renderDiffs() : renderNoDiffs();
  };
  const renderDiffs = () => {
    if (eventDiffs.hasDiffs) {
      return (
        <VStack left>
          <Typography variant="body1" color="textSecondary">
            There are differences between the filtered event and the input event.
          </Typography>
          <CollapsableContainer title={'more info'} collapsed={true}>
            <VStack left sx={{ px: 6 }}>
              <Typography variant="body2" color="textSecondary">
                When UT processes an event it verifies the event shape. This can lead to
                some properties being added, removed, or updated. This is common, and
                should be no cause for concern.
              </Typography>
              <Typography variant="body2" color="textSecondary">
                However, if you are experiencing issues with the event, you may want to
                investigate the differences below.
              </Typography>
              <Typography variant="body2" color="textSecondary">
                The sections (added, deleted, updated) show what happened to the filtered
                version of the event after it was processed by UT.
              </Typography>
            </VStack>
          </CollapsableContainer>
          <EventRawViewer event={eventDiffs} />
        </VStack>
      );
    }
  };
  const renderNoDiffs = () => {
    if (!eventDiffs.hasDiffs) {
      return (
        <Typography variant="body2" color="textSecondary">
          No diffs. The filtered event matches the input event.
        </Typography>
      );
    }
  };
  return (
    <VStack hFill topLeft>
      {renderBody()}
    </VStack>
  );
}

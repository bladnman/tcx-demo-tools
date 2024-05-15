import CollapsableContainer from '@common/CollapsableContainer.tsx';
import { HStack, VStack } from '@common/mui-stacks.tsx';
import CONST from '@const/CONST.ts';
import useDetailTabs from '@features/inspector-panel/features/details-nav-stack/hooks/useDetailTabs.ts';
import DetailsSummaryViewer from '@features/inspector-panel/features/details-summary-viewer/DetailsSummaryViewer.tsx';
import SummaryEventDiffs from '@features/inspector-panel/features/details-summary-viewer/features/event-diffs/SummaryEventDiffs.tsx';
import EventRawViewer from '@features/inspector-panel/features/event-raw-viewer/EventRawViewer.tsx';
import useScrollAwareness from '@hooks/useScrollAwareness.ts';
import SpeakerNotesIcon from '@mui/icons-material/SpeakerNotes';
import SummarizeIcon from '@mui/icons-material/Summarize';
import { Tab, Tabs, Typography } from '@mui/material';
import actionSetDetailsActiveTab from '@store/settings-store/actions/actionSetDetailsActiveTab.ts';
import React, { useRef } from 'react';

export default function DetailsNavStack({ event }: { event: TVEvent }) {
  const hasNotes = event.hasFailures;
  const vStackRef = useRef(null);
  const isScrolled = useScrollAwareness(vStackRef);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    actionSetDetailsActiveTab(
      newValue === 0 ? 'Summary' : newValue === 1 ? 'Notes' : 'Raw',
    );
  };

  const { tabIndex, isRawTab, isNotesTab, isSummaryTab, hasSummary } =
    useDetailTabs(event);

  const renderTitle = (title: string) => {
    return (
      <HStack hFill spaceBetween>
        <Typography
          fontFamily={'anton'}
          fontSize={'1.5em'}
          fontWeight={'bold'}
          sx={{
            color: 'text.primary',
            textTransform: 'uppercase',
          }}
        >
          {title}
        </Typography>
      </HStack>
    );
  };
  const renderData = () => {
    return (
      <VStack hFill topLeft>
        <DetailsSummaryViewer event={event} />

        <VStack>
          <CollapsableContainer title={renderTitle('Event Data')} collapsed={false}>
            <EventRawViewer event={event} />
          </CollapsableContainer>

          <CollapsableContainer title={renderTitle('Event Diffs')} collapsed={true}>
            <SummaryEventDiffs event={event} />
          </CollapsableContainer>
        </VStack>
      </VStack>
    );
  };

  return (
    <VStack fill top spacing={0}>
      <Tabs
        value={tabIndex}
        onChange={handleChange}
        centered
        sx={{
          width: '100%',
          flexShrink: 0,
          boxShadow: isScrolled ? CONST.SCROLL_DROP_BOX_SHADOW : 'none',
        }}
      >
        <Tab
          icon={<SummarizeIcon />}
          label="DATA"
          sx={{
            opacity: hasSummary ? 1 : 0.5,
          }}
          disabled={!hasSummary}
        />
        <Tab
          icon={<SpeakerNotesIcon />}
          label="NOTES"
          sx={{
            color: hasNotes ? 'appPink.main' : 'default',
            opacity: hasNotes ? 1 : 0.5,
          }}
          disabled={!hasNotes}
        />
      </Tabs>

      <VStack topLeft hFill ref={vStackRef} sx={{ px: 2, pt: 2, overflow: 'auto' }}>
        {(isSummaryTab || isRawTab) && renderData()}
        {isNotesTab && <EventRawViewer event={event} />}
      </VStack>
    </VStack>
  );
}

import { VStack } from '@common/mui-stacks.tsx';
import CONST from '@const/CONST.ts';
import useScrollAwareness from '@hooks/useScrollAwareness.ts';
import SegmentIcon from '@mui/icons-material/Segment';
import SpeakerNotesIcon from '@mui/icons-material/SpeakerNotes';
import SummarizeIcon from '@mui/icons-material/Summarize';
import { Tab, Tabs } from '@mui/material';
import useDetailTabs from '@pages/timeline/features/right-drawer/features/details-nav-stack/hooks/useDetailTabs.ts';
import DetailsSummaryViewer from '@pages/timeline/features/right-drawer/features/details-summary-viewer/DetailsSummaryViewer.tsx';
import EventRawViewer from '@pages/timeline/features/right-drawer/features/event-raw-viewer/EventRawViewer.tsx';
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
          label="SUMMARY"
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
        <Tab icon={<SegmentIcon />} label="RAW" />
      </Tabs>

      <VStack topLeft hFill ref={vStackRef} sx={{ px: 2, pt: 2, overflow: 'auto' }}>
        {isSummaryTab && <DetailsSummaryViewer event={event} />}
        {isNotesTab && <EventRawViewer event={event} />}
        {isRawTab && <EventRawViewer event={event} />}
      </VStack>
    </VStack>
  );
}

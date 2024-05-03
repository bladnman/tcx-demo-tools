import React, { useRef } from 'react';
import { Tab, Tabs } from '@mui/material';
import SummarizeIcon from '@mui/icons-material/Summarize';
import SegmentIcon from '@mui/icons-material/Segment';
import SpeakerNotesIcon from '@mui/icons-material/SpeakerNotes';
import { VStack } from '@common/mui-stacks.tsx';
import EventRawViewer from '@pages/timeline/features/right-drawer/features/event-raw-viewer/EventRawViewer.tsx';
import DetailsSummaryViewer from '@pages/timeline/features/right-drawer/features/details-summary-viewer/DetailsSummaryViewer.tsx';
import CONST from '@const/CONST.ts';
import useScrollAwareness from '@hooks/useScrollAwareness.ts';

export default function DetailsNavStack({ event }: { event: TVEvent }) {
  const [value, setValue] = React.useState(0);
  const hasNotes = false;
  const vStackRef = useRef(null);
  const isScrolled = useScrollAwareness(vStackRef);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <VStack fill top spacing={0}>
      <Tabs
        value={value}
        onChange={handleChange}
        centered
        sx={{
          width: '100%',
          flexShrink: 0,
          boxShadow: isScrolled ? CONST.SCROLL_DROP_BOX_SHADOW : 'none',
        }}
      >
        <Tab icon={<SummarizeIcon />} label="SUMMARY" />
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
        <DetailsSummaryViewer event={event} />
        <EventRawViewer event={event} />
      </VStack>
    </VStack>
  );
}

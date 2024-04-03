import React from 'react';
import { Tab, Tabs } from '@mui/material';
import SummarizeIcon from '@mui/icons-material/Summarize';
import SegmentIcon from '@mui/icons-material/Segment';
import SpeakerNotesIcon from '@mui/icons-material/SpeakerNotes';
import { VStack } from '@common/mui-stacks.tsx';
import EventRawViewer from '@pages/telemetry-viewer-page/features/right-drawer/features/event-raw-viewer/EventRawViewer.tsx';
import DetailsSummaryViewer from '@pages/telemetry-viewer-page/features/right-drawer/features/details-summary-viewer/DetailsSummaryViewer.tsx';

export default function DetailsNavStack({ event }: { event: TVEvent }) {
  const [value, setValue] = React.useState(0);
  const hasNotes = false;

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <VStack fill>
      <Tabs value={value} onChange={handleChange} sx={{ flexShrink: 0 }}>
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

      <DetailsSummaryViewer event={event} />
      <EventRawViewer event={event} />
    </VStack>
  );
}

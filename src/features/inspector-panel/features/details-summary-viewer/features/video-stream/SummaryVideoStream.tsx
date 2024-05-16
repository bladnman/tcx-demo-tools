import TWEvent from '@classes/data/TWEvent.ts';
import { HStack, VStack } from '@common/mui-stacks.tsx';
import FIELD_DEF from '@const/FIELD_DEF.ts';
import SummaryTable, {
  SummaryTableRowDef,
} from '@features/inspector-panel/features/details-summary-viewer/common/SummaryTable.tsx';
import SumVideoSession from '@features/inspector-panel/features/details-summary-viewer/features/video-stream/features/SumVideoSession.tsx';
import useEventColor from '@hooks/useEventColor.ts';

export default function SummaryVideoStream({ event }: { event: TWEvent }) {
  const eventColor = useEventColor(event);

  const rowDefs: SummaryTableRowDef[] = [
    {
      ...FIELD_DEF.type,
      alwaysShow: true,
      color: `${eventColor}.main`,
    },
    FIELD_DEF.videoTitle,
    FIELD_DEF.videoType,
    FIELD_DEF.videoId,
    FIELD_DEF.duration,
  ];

  const overviewDefs: SummaryTableRowDef[] = [
    FIELD_DEF.appName,
    FIELD_DEF.locationScene,
    FIELD_DEF.platformType,
    FIELD_DEF.videoPlayerReadyTime,
    FIELD_DEF.videoLoadTime,
    FIELD_DEF.videoStartTime,
  ];

  return (
    <VStack hFill>
      <HStack hFill topLeft>
        <SummaryTable event={event} rowDefs={rowDefs} />
        <SummaryTable event={event} rowDefs={overviewDefs} />
      </HStack>
      <SumVideoSession event={event} />
    </VStack>
  );
}

import SummaryTable, {
  SummaryTableRowDef,
} from '@pages/timeline/features/right-drawer/features/details-summary-viewer/common/SummaryTable.tsx';
import { HStack, VStack } from '@common/mui-stacks.tsx';
import FIELD_DEF from '@const/FIELD_DEF.ts';
import { EVENT_TYPE_DEF } from '@const/EVENT_TYPE.ts';
import { EventTypes } from '@const/event-types.ts';
import SumVideoSession from '@pages/timeline/features/right-drawer/features/details-summary-viewer/features/video-stream/features/SumVideoSession.tsx';

export default function SummaryVideoStream({ event }: { event: TVEvent }) {
  const eventColor = EVENT_TYPE_DEF[event.type as EventTypes].color;

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

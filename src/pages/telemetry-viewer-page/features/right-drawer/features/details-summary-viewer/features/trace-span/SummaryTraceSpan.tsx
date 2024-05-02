import { EVENT_TYPE_DEF } from '@pages/telemetry-viewer-page/constants/EVENT_TYPE.ts';
import { EventTypes } from '@pages/telemetry-viewer-page/constants/event-types.ts';
import SummaryTable, {
  SummaryTableRowDef,
} from '@pages/telemetry-viewer-page/features/right-drawer/features/details-summary-viewer/common/SummaryTable.tsx';
import FIELD_DEF from '@pages/telemetry-viewer-page/constants/FIELD_DEF.ts';
import { HStack, VStack } from '@common/mui-stacks.tsx';
import SumTraceSpanTagList from '@pages/telemetry-viewer-page/features/right-drawer/features/details-summary-viewer/features/trace-span/features/SumTraceSpanTagList.tsx';

export default function SummaryTraceSpan({ event }: { event: TVEvent }) {
  const eventColor = EVENT_TYPE_DEF[event.type as EventTypes].color;

  const rowDefs: SummaryTableRowDef[] = [
    {
      ...FIELD_DEF.type,
      alwaysShow: true,
      color: `${eventColor}.main`,
    },
    FIELD_DEF.spanId,
  ];

  const overviewDefs: SummaryTableRowDef[] = [FIELD_DEF.appName];

  return (
    <VStack hFill topLeft>
      <HStack hFill topLeft>
        <SummaryTable event={event} rowDefs={rowDefs} />
        <SummaryTable
          event={event}
          rowDefs={overviewDefs}
          stackOptions={{ topRight: true, topLeft: false }}
        />
      </HStack>

      <SumTraceSpanTagList event={event} />
    </VStack>
  );
}

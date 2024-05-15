import { EVENT_TYPE_DEF } from '@const/EVENT_TYPE.ts';
import { EventTypes } from '@const/event-types.ts';
import SummaryTable, {
  SummaryTableRowDef,
} from '@features/inspector-panel/features/details-summary-viewer/common/SummaryTable.tsx';
import FIELD_DEF from '@const/FIELD_DEF.ts';
import { HStack, VStack } from '@common/mui-stacks.tsx';
import SumTraceSpanTagList from '@features/inspector-panel/features/details-summary-viewer/features/trace-span/features/SumTraceSpanTagList.tsx';

export default function SummaryTraceSpan({ event }: { event: TVEvent }) {
  const eventColor = EVENT_TYPE_DEF[event.type as EventTypes]?.color ?? 'fg';

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

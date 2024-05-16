import TWEvent from '@classes/data/TWEvent.ts';
import { HStack, VStack } from '@common/mui-stacks.tsx';
import SumNavLastX from '@common/summary-widgets/SumNavLastX.tsx';
import FIELD_DEF from '@const/FIELD_DEF.ts';
import SummaryTable, {
  SummaryTableRowDef,
} from '@features/inspector-panel/features/details-summary-viewer/common/SummaryTable.tsx';
import SumNavFromTo from '@features/inspector-panel/features/details-summary-viewer/features/navigation/features/SumNavFromTo.tsx';
import useEventColor from '@hooks/useEventColor.ts';

export default function SummaryNavigation({ event }: { event: TWEvent }) {
  const eventColor = useEventColor(event);

  const rowDefs: SummaryTableRowDef[] = [
    {
      ...FIELD_DEF.type,
      alwaysShow: true,
      color: `${eventColor}.main`,
    },
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

      <SumNavFromTo event={event} />
      <SumNavLastX event={event} x={4} />
    </VStack>
  );
}

import TWEvent from '@classes/data/TWEvent.ts';
import { HStack, VStack } from '@common/mui-stacks.tsx';
import SumHistoryLastX from '@common/summary-widgets/SumHistoryLastX.tsx';
import FIELD_DEF from '@const/FIELD_DEF.ts';
import SummaryTable, {
  SummaryTableRowDef,
} from '@features/inspector-panel/features/details-summary-viewer/common/SummaryTable.tsx';
import VisualObject from '@features/inspector-panel/features/details-summary-viewer/features/impression/features/VisualObject.tsx';
import useEventColor from '@hooks/useEventColor.ts';

export default function SummaryImpression({ event }: { event: TWEvent }) {
  const eventColor = useEventColor(event);

  const rowDefs: SummaryTableRowDef[] = [
    {
      ...FIELD_DEF.type,
      alwaysShow: true,
      color: `${eventColor}.main`,
    },
    {
      ...FIELD_DEF.visualEntityType,
      alwaysShow: true,
      color: 'secondary.main',
    },
    {
      ...FIELD_DEF.ctaSubType,
      color: 'secondary.main',
    },
    FIELD_DEF.searchTerm,
    FIELD_DEF.strandName,
    FIELD_DEF.tilePosition,
    FIELD_DEF.tileContent,
  ];

  const overviewDefs: SummaryTableRowDef[] = [
    FIELD_DEF.appName,
    FIELD_DEF.locationScene,
    FIELD_DEF.platformType,
  ];

  return (
    <VStack hFill>
      <HStack hFill topLeft>
        <SummaryTable event={event} rowDefs={rowDefs} />
        <SummaryTable event={event} rowDefs={overviewDefs} />
      </HStack>
      <VisualObject event={event} />
      <SumHistoryLastX event={event} />
    </VStack>
  );
}

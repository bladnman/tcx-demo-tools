import SummaryTable, {
  SummaryTableRowDef,
} from '@features/inspector-panel/features/details-summary-viewer/common/SummaryTable.tsx';
import { HStack, VStack } from '@common/mui-stacks.tsx';
import FIELD_DEF from '@const/FIELD_DEF.ts';
import { EVENT_TYPE_DEF } from '@const/EVENT_TYPE.ts';
import { EventTypes } from '@const/event-types.ts';
import SumHistoryLastX from '@common/summary-widgets/SumHistoryLastX.tsx';
import VisualObject from '@features/inspector-panel/features/details-summary-viewer/features/impression/features/VisualObject.tsx';

export default function SummaryImpression({ event }: { event: TVEvent }) {
  const eventColor = EVENT_TYPE_DEF[event.type as EventTypes]?.color ?? 'fg';

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

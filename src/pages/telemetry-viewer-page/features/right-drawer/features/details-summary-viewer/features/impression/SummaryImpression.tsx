import SummaryTable, {
  SummaryTableRowDef,
} from '@pages/telemetry-viewer-page/features/right-drawer/features/details-summary-viewer/common/SummaryTable.tsx';
import { HStack, VStack } from '@common/mui-stacks.tsx';
import FIELD_DEF from '@pages/telemetry-viewer-page/constants/FIELD_DEF.ts';
import { EVENT_TYPE_DEF } from '@pages/telemetry-viewer-page/constants/EVENT_TYPE.ts';
import { EventTypes } from '@pages/telemetry-viewer-page/types/event-types.ts';
import SumHistoryLastX from '@pages/telemetry-viewer-page/common/summary-widgets/SumHistoryLastX.tsx';

export default function SummaryImpression({ event }: { event: TVEvent }) {
  const eventColor = EVENT_TYPE_DEF[event.type as EventTypes].color;

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
      <SumHistoryLastX event={event} />
    </VStack>
  );
}

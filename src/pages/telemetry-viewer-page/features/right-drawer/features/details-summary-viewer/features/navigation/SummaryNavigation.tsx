import SummaryTable, {
  SummaryTableRowDef,
} from '@pages/telemetry-viewer-page/features/right-drawer/features/details-summary-viewer/common/SummaryTable.tsx';
import { HStack, VStack } from '@common/mui-stacks.tsx';
import FIELD_DEF from '@pages/telemetry-viewer-page/constants/FIELD_DEF.ts';
import { EVENT_TYPE_DEF } from '@pages/telemetry-viewer-page/constants/EVENT_TYPE.ts';
import { EventTypes } from '@pages/telemetry-viewer-page/types/event-types.ts';
import SumNavFromTo from '@pages/telemetry-viewer-page/features/right-drawer/features/details-summary-viewer/features/navigation/features/SumNavFromTo.tsx';
import SumNavLastX from '@pages/telemetry-viewer-page/common/summary-widgets/SumNavLastX.tsx';

export default function SummaryNavigation({ event }: { event: TVEvent }) {
  const eventColor = EVENT_TYPE_DEF[event.type as EventTypes].color;

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

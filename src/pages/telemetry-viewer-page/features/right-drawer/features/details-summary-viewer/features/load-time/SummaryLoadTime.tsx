import SummaryTable, {
  SummaryTableRowDef,
} from '@pages/telemetry-viewer-page/features/right-drawer/features/details-summary-viewer/common/SummaryTable.tsx';
import { HStack, VStack } from '@common/mui-stacks.tsx';
import FIELD_DEF from '@pages/telemetry-viewer-page/constants/FIELD_DEF.ts';
import { EVENT_TYPE_DEF } from '@pages/telemetry-viewer-page/constants/EVENT_TYPE.ts';
import { EventTypes } from '@pages/telemetry-viewer-page/constants/event-types.ts';
import SumLoadTimeMetricList from '@pages/telemetry-viewer-page/features/right-drawer/features/details-summary-viewer/features/load-time/features/SumLoadTimeMetricList.tsx';

export default function SummaryLoadTime({ event }: { event: TVEvent }) {
  const eventColor = EVENT_TYPE_DEF[event.type as EventTypes].color;

  const rowDefs: SummaryTableRowDef[] = [
    {
      ...FIELD_DEF.type,
      alwaysShow: true,
      color: `${eventColor}.main`,
    },
    FIELD_DEF.locationScene,
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

      <SumLoadTimeMetricList event={event} />
    </VStack>
  );
}

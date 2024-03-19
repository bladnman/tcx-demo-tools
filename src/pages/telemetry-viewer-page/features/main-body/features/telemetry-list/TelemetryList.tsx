import { VStack } from '@common/mui-stacks.tsx';
import useTelemetryStore from '@pages/telemetry-viewer-page/store/useTelemetryStore.ts';
import TelemetryRow from '@pages/telemetry-viewer-page/features/main-body/features/telemetry-list/features/telemetry-row/TelemetryRow.tsx';
import { ReactNode, useRef } from 'react';
import TelemetryDivider from '@pages/telemetry-viewer-page/features/main-body/features/telemetry-list/features/TelemetryDivider.tsx';
import { cleanedFieldValue } from '@pages/telemetry-viewer-page/utils/telemetry-utils.ts';

export default function TelemetryList() {
  const { displayEvents } = useTelemetryStore();
  const { eventForDetails, setEventForDetails, dividerField } =
    useTelemetryStore();
  let dividerValue = useRef<string | undefined>().current;
  const renderRows = () => {
    const rows: ReactNode[] = [];
    displayEvents.forEach((event, index) => {
      if (dividerField) {
        const eventValue = cleanedFieldValue(
          dividerField,
          (event.final as Hash)[dividerField],
        );
        if (dividerValue !== eventValue) {
          dividerValue = eventValue;
          rows.push(
            <TelemetryDivider
              key={`divider_${index}`}
              field={dividerField}
              value={dividerValue ?? ''}
            />,
          );
        }
      }

      rows.push(
        <TelemetryRow
          key={`row_${index}`}
          event={event}
          selected={eventForDetails === event}
          onClick={() => {
            setEventForDetails(eventForDetails === event ? null : event);
          }}
        />,
      );
    });
    return rows;
  };
  return (
    <VStack
      hFill
      vAlign={'leading'}
      hAlign={'leading'}
      spacing={0}
      sx={{ maxWidth: '90vw' }}
    >
      {renderRows()}
    </VStack>
  );
}

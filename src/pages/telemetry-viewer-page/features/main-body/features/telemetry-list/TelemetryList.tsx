import { VStack } from '@common/mui-stacks.tsx';
import useTelemetryStore from '@pages/telemetry-viewer-page/store/useTelemetryStore.ts';
import TelemetryRow from '@pages/telemetry-viewer-page/features/main-body/features/telemetry-list/features/telemetry-row/TelemetryRow.tsx';
import { ReactNode, useRef } from 'react';
import TelemetryDivider from '@pages/telemetry-viewer-page/features/main-body/features/telemetry-list/features/TelemetryDivider.tsx';
import {
  cleanedFieldValue,
  getValueFromEvent,
} from '@pages/telemetry-viewer-page/utils/telemetry-utils.ts';
import useEventsForDisplay from '@pages/telemetry-viewer-page/features/main-body/features/telemetry-list/hooks/useEventsForDisplay.ts';

export default function TelemetryList() {
  const displayEvents = useEventsForDisplay();
  const { eventForDetails, setEventForDetails, dividerFields } =
    useTelemetryStore();
  let dividerValues = useRef<string[] | undefined[]>([]).current;

  const renderRows = () => {
    const rows: ReactNode[] = [];
    displayEvents.forEach((event, index) => {
      if (dividerFields.length > 0) {
        for (let i = 0; i < dividerFields.length; i++) {
          const dividerField = dividerFields[i];
          const dividerValue = dividerValues[i];
          const eventValue = cleanedFieldValue(
            dividerField,
            getValueFromEvent(event, dividerField) ?? `Unknown`,
          );

          if (dividerValue !== eventValue) {
            // once we have a value not matching
            // we remove the following values
            dividerValues = dividerValues.slice(0, i);
            // then add the new value at this index
            dividerValues[i] = eventValue;
            rows.push(
              <TelemetryDivider
                key={`divider_${dividerField}_${index}`}
                field={dividerField}
                value={dividerValues[i] ?? ''}
                sx={{
                  pl: `${i}em`,
                  pt: 0,
                  pb: 0,
                  position: 'sticky',
                  top: `calc(0px + ${i * 30}px)`,
                  backgroundColor: 'bg.main',
                }}
              />,
            );
          }
        }
      }

      rows.push(
        <TelemetryRow
          key={`row_${event.id}_${index}`}
          event={event}
          selected={eventForDetails === event}
          onClick={() => {
            setEventForDetails(eventForDetails === event ? null : event);
          }}
          sx={{ pl: `${Math.max(0, dividerFields.length - 1)}em` }}
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

import { HStack, VStack } from '@common/mui-stacks.tsx';
import useSettingsStore from '@pages/telemetry-viewer-page/store/settings-store/useSettingsStore.ts';
import TelemetryRow from '@pages/telemetry-viewer-page/features/main-body/features/telemetry-list/features/telemetry-row/TelemetryRow.tsx';
import React, { ReactNode, useMemo, useRef, useState } from 'react';
import TelemetryDivider from '@pages/telemetry-viewer-page/features/main-body/features/telemetry-list/features/TelemetryDivider.tsx';
import { getValueFromEvent } from '@pages/telemetry-viewer-page/utils/telemetry-utils.ts';
import { useEventForDetails } from '@pages/telemetry-viewer-page/store/event-store/useEventStore.ts';
import actionToggleEventForDetailsById from '@pages/telemetry-viewer-page/store/event-store/actions/actionToggleEventForDetailsById.ts';
import RowContextMenu from '@pages/telemetry-viewer-page/features/main-body/features/telemetry-list/features/telemetry-row/features/row-context-menu/RowContextMenu.tsx';
import { usePopupState } from 'material-ui-popup-state/hooks';

export default function TelemetryList({
  events,
  allowDividers = true,
  allowSelection = true,
}: {
  events: TVEvent[];
  allowDividers?: boolean;
  allowSelection?: boolean;
}) {
  const [contextMenuEvent, setContextMenuEvent] = useState<TVEvent | null>(null);
  const eventForDetails = useEventForDetails();
  const { dividerFields } = useSettingsStore();
  let dividerValues = useRef<string[] | undefined[]>([]).current;
  const contextPopupState = usePopupState({
    variant: 'popover',
    popupId: 'event-row-context-menu',
  });
  const handleContextMenuClick = useMemo(() => {
    return (e: React.MouseEvent, event: TVEvent) => {
      e.preventDefault();
      setContextMenuEvent(event);
      if (event) {
        setTimeout(() => {
          contextPopupState.open(e);
        }, 100);
      }
    };
    // if you include contextPopupState in the dependencies, it will cause a re-render loop
    // eslint-disable-next-line react-hooks/exhaustive-deps -- intentionally not exhaustive
  }, []);

  const renderRows = () => {
    const rows: ReactNode[] = [];
    if (!events || events.length < 1) return rows;
    events.forEach((event, idx) => {
      if (allowDividers && dividerFields.length > 0) {
        for (let i = 0; i < dividerFields.length; i++) {
          const dividerField = dividerFields[i];
          const dividerValue = dividerValues[i];
          const eventValue = getValueFromEvent(event, dividerField) ?? `(none)`;

          if (dividerValue !== eventValue) {
            // once we have a value not matching
            // we remove the following values
            dividerValues = dividerValues.slice(0, i);
            // then add the new value at this idx
            dividerValues[i] = eventValue;
            rows.push(
              <TelemetryDivider
                key={`divider_${dividerField}_${idx}`}
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
        <HStack
          hFill
          left
          key={`row_${event.id}_${dividerFields.length}`}
          sx={{ pl: `${Math.max(0, dividerFields.length - 1)}em` }}
        >
          <TelemetryRow
            event={event}
            selected={eventForDetails === event}
            onClick={allowSelection ? actionToggleEventForDetailsById : undefined}
            onContextClick={handleContextMenuClick}
          />
        </HStack>,
      );
    });
    return rows;
  };
  return (
    <VStack hFill vAlign={'leading'} hAlign={'leading'} spacing={0}>
      {renderRows()}
      <RowContextMenu event={contextMenuEvent} popupState={contextPopupState} />
    </VStack>
  );
}

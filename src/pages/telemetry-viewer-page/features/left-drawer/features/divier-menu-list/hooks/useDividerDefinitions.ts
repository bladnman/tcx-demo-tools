import { getAllDividerFieldDefs } from '@pages/telemetry-viewer-page/constants/FIELD_DEF.ts';
import { useCallback, useMemo } from 'react';
import useTelemetryStore from '@pages/telemetry-viewer-page/store/useTelemetryStore.ts';

export default function useDividerDefinitions() {
  const { dividerFields, setDividerFields } = useTelemetryStore();

  const allDefs = useMemo(() => {
    return getAllDividerFieldDefs();
  }, []);
  const toggleDivider = useCallback(
    (item: FieldDefinition) => {
      // REMOVE
      if (dividerFields.includes(item.field)) {
        setDividerFields(dividerFields.filter((field) => field !== item.field));
      }
      // ADD
      else {
        dividerFields.push(item.field);
        setDividerFields(dividerFields);
      }
    },
    [dividerFields, setDividerFields],
  );
  return useMemo(() => {
    const dividerFieldList: FieldDefinition[] = [];
    // add the selected fields, in order
    dividerFields.forEach((item) => {
      const def = allDefs.find((def) => def.field === item);
      if (def) {
        dividerFieldList.push(def);
      }
    });

    // add the rest of the fields
    dividerFieldList.push(
      ...allDefs.filter((def) => !dividerFields.includes(def.field)),
    );

    return {
      dividerFieldList,
      selectedDividerFields: dividerFields,
      toggleDivider,
    };
  }, [allDefs, dividerFields, toggleDivider]);
}

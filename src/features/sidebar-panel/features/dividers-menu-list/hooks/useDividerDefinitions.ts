import { getAllDividerFieldDefs } from '@const/FIELD_DEF.ts';
import { useCallback, useMemo } from 'react';
import useSettingsStore from '@store/settings-store/useSettingsStore.ts';
import actionSetDividerFields from '@store/settings-store/actions/actionSetDividerFields.ts';

export default function useDividerDefinitions() {
  const { dividerFields } = useSettingsStore();

  const allDefs = useMemo(() => {
    return getAllDividerFieldDefs();
  }, []);
  const toggleDivider = useCallback(
    (item: FieldDefinition) => {
      // REMOVE
      if (dividerFields.includes(item.field)) {
        actionSetDividerFields(dividerFields.filter((field) => field !== item.field));
      }
      // ADD
      else {
        dividerFields.push(item.field);
        actionSetDividerFields(dividerFields);
      }
    },
    [dividerFields],
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
    dividerFieldList.push(...allDefs.filter((def) => !dividerFields.includes(def.field)));

    return {
      dividerFieldList,
      selectedDividerFields: dividerFields,
      toggleDivider,
    };
  }, [allDefs, dividerFields, toggleDivider]);
}

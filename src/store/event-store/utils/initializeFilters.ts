import { getAllFiltersFieldDefs, getDefaultFiltersFieldDefs } from '@const/FIELD_DEF.ts';
import TelemetryFilter from '@classes/TelemetryFilter.ts';
import getSavedStore from '@store/event-store/utils/getSavedStore.ts';

interface SavedFilterStore {
  __filter_fields: { field: string; isCollapsed: boolean }[];
  __divider_fields: string[];
}
export default function initializeFilters() {
  const savedStore = getSavedStore<SavedFilterStore>('event-store');
  const savedFilterFields = savedStore.__filter_fields || [];

  // SAVED
  if (savedFilterFields.length > 0) {
    return savedFilterFields
      .map((savedFieldDef) => {
        const fieldDef = getAllFiltersFieldDefs().find(
          (f) => f.field === savedFieldDef.field,
        );
        if (!fieldDef) return null;
        const def = new TelemetryFilter(fieldDef);
        def.collapsed = savedFieldDef.isCollapsed;
        return def;
      })
      .filter((f) => f) as TelemetryFilter[];
  }

  // DEFAULTS
  return getDefaultFiltersFieldDefs().map((fieldDef) => new TelemetryFilter(fieldDef));
}

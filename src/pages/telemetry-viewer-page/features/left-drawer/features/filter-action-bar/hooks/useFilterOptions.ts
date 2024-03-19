import useTelemetryStore from '@pages/telemetry-viewer-page/store/useTelemetryStore.ts';
import { getAllFiltersFieldDefs } from '@pages/telemetry-viewer-page/constants/FIELD_DEF.ts';
import { useMemo } from 'react';

export default function useFilterOptions() {
  const { filters } = useTelemetryStore();
  const allFilterFieldDefs = useMemo(() => {
    return getAllFiltersFieldDefs();
  }, []);
  return useMemo(() => {
    return allFilterFieldDefs.map((filter) => {
      return {
        field: filter.field,
        label: filter.title,
        selected: !!filters.find((f) => f.field === filter.field),
      };
    });
  }, [filters, allFilterFieldDefs]);
}

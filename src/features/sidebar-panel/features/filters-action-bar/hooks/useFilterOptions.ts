import { getAllFiltersFieldDefs } from '@const/FIELD_DEF.ts';
import { useMemo } from 'react';
import { useFilters } from '@store/event-store/useEventStore.ts';

export default function useFilterOptions() {
  const filters = useFilters();
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

import useTelemetryStore from '@pages/telemetry-viewer-page/store/useTelemetryStore.ts';
import { useCallback, useMemo } from 'react';
import TelemetryFilter from '@pages/telemetry-viewer-page/classes/TelemetryFilter.ts';

export default function useFilter(
  type: FilterType,
): [TelemetryFilter, (values: string[]) => void] {
  const {
    filters,
    setFilters,
    setActiveFilterValues: setActiveFilterValuesInStore,
  } = useTelemetryStore();

  const filter = useMemo(() => {
    const existingFilter = filters.find((filter) => filter.type === type);
    if (existingFilter) return existingFilter;

    const newFilter = new TelemetryFilter(type);
    setFilters([...filters, newFilter]);
    return newFilter;
  }, [filters, setFilters, type]);

  // set all values to active
  const setActiveFilterValues = useCallback(
    (values: string[]) => {
      setActiveFilterValuesInStore(type, values);
    },
    [type, setActiveFilterValuesInStore],
  );

  return [filter, setActiveFilterValues];
}

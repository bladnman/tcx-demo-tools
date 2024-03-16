import {
  StoreAction,
  TelemetryStore,
} from '@pages/telemetry-viewer-page/store/useTelemetryStore.ts';
import TelemetryFilter from '@pages/telemetry-viewer-page/utils/filter-utils/TelemetryFilter.ts';
import { actionSaveFilters } from '@pages/telemetry-viewer-page/store/actions/actionSaveFilters.ts';

export function actionActivateFilterValues({
  state,
  filterType,
  values,
}: StoreAction & {
  filterType: FilterType;
  values: string[];
}): Partial<TelemetryStore> {
  const currentFilters = state.filters;

  let thisFilter = currentFilters.find((f) => f.type === filterType);
  if (!thisFilter) {
    thisFilter = new TelemetryFilter(filterType, values);
  } else {
    // let's remove old active items
    thisFilter.clearActive();
  }

  thisFilter.activateValues(values);

  return actionSaveFilters({ state });
}

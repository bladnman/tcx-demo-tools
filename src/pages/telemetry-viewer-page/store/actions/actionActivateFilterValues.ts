import {
  StoreAction,
  TelemetryStore,
} from '@pages/telemetry-viewer-page/store/useTelemetryStore.ts';
import { actionSaveFilters } from '@pages/telemetry-viewer-page/store/actions/actionSaveFilters.ts';

export function actionActivateFilterValues({
  state,
  filterType,
  values,
}: StoreAction & {
  filterType: FilterType;
  values: string[];
}): Partial<TelemetryStore> {
  const thisFilter = state.filters.find((f) => f.type === filterType);

  if (thisFilter) {
    thisFilter.clearActive();
    thisFilter.activateValues(values);
  }

  return actionSaveFilters({ state });
}

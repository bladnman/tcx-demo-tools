import {
  StoreAction,
  TelemetryStore,
} from '@pages/telemetry-viewer-page/store/useTelemetryStore.ts';
import getDisplayableEvents from '@pages/telemetry-viewer-page/store/utils/getDisplayableEvents.ts';

export function actionActivateFilterValues({
  state,
  filterType,
  values,
}: StoreAction & {
  filterType: FilterType;
  values: string[];
}): Partial<TelemetryStore> {
  // NOTE: when we change a "filter item" like this we are
  // making a change deep in the state. This means we need
  // to re-evaluate and re-publish
  const thisFilter = state.filters.find((f) => f.type === filterType);
  if (thisFilter) {
    thisFilter.clearActive();
    thisFilter.activateValues(values);
  }

  // when filters change we have to "match" the events again
  const displayEvents = getDisplayableEvents(state.allEvents, state.filters);

  return {
    filters: [...state.filters],
    displayEvents: [...displayEvents],
  };
}

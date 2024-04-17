import useEventStore from '@pages/telemetry-viewer-page/store/event-store/useEventStore.ts';
import getDisplayableEvents from '@pages/telemetry-viewer-page/store/utils/getDisplayableEvents.ts';

export default function actionActivateFilterValues(
  filterType: FilterType,
  values: string[],
) {
  const { allEvents, filters } = useEventStore.getState();

  // NOTE: when we change a "filter item" like this we are
  // making a change deep in the state. This means we need
  // to re-evaluate and re-publish
  const thisFilter = filters.find((f) => f.type === filterType);
  if (!thisFilter) return;

  // clear any previous active values
  thisFilter.clearActive();
  // set these values as active
  thisFilter.activateValues(values);

  // RE-MATCH
  // when filters change we have to "match" the events again
  const displayEvents = getDisplayableEvents(allEvents, filters);

  //
  // SAVE CLEANED FILTERS
  useEventStore.setState({ filters: [...filters] });

  //
  // SAVE DISPLAY EVENTS
  useEventStore.setState({ displayEvents });
}

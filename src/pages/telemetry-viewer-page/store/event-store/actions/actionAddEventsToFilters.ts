import applyFilters from '@pages/telemetry-viewer-page/utils/filter-utils/applyFilters.ts';
import useEventStore from '@pages/telemetry-viewer-page/store/event-store/useEventStore.ts';

export default function actionAddEventsToFilters(events: TVEvent[]) {
  const { displayEvents, filters, maxEventCount } = useEventStore.getState();

  //
  // ADD EVENTS TO EACH FILTER
  filters.forEach((filter) => filter.incrementEvents(events));

  //
  // SAVE THE FILTERS
  useEventStore.setState({ filters: [...filters] });

  // ADD NEW EVENTS THAT PASS FILTERS TO DISPLAY EVENTS
  const filteredNewEvents = applyFilters(events, filters);
  if (filteredNewEvents.length) {
    const newDisplayEvents = [...displayEvents, ...filteredNewEvents];

    // splice off if we are over maxEventCount
    if (newDisplayEvents.length > maxEventCount) {
      newDisplayEvents.splice(0, maxEventCount - 1);
    }
    //
    // SAVE DISPLAY EVENTS
    useEventStore.setState({
      displayEvents: newDisplayEvents,
    });
  }
}

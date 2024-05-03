import useEventStore from '@store/event-store/useEventStore.ts';
import actionAddEventsToFilters from '@store/event-store/actions/actionAddEventsToFilters.ts';

export default function actionRecalculateFilters() {
  const { allEvents, filters: oldFilters } = useEventStore.getState();
  const filters = [...oldFilters];

  //
  // CLEAR FILTERS
  // remove unselected items from filters
  filters.forEach((filter) => filter.removeInactiveItems());
  // clear the counts for any selected items
  filters.forEach((filter) => filter.clearValues());

  //
  // SAVE CLEANED FILTERS
  useEventStore.setState({ filters });

  //
  // CLEAR DISPLAY EVENTS
  useEventStore.setState({ displayEvents: [] });

  //
  // REBUILD FILTERS
  // this is basically sending all events through the filters again
  // _will also update the display events_
  actionAddEventsToFilters(allEvents);
}

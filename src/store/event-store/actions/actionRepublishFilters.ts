import useEventStore from '@store/event-store/useEventStore.ts';
import getDisplayableEvents from '@store/utils/getDisplayableEvents.ts';

export default function actionRepublishFilters() {
  const { allEvents, filters } = useEventStore.getState();

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

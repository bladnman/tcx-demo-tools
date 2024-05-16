import TWEvent from '@classes/data/TWEvent.ts';
import useEventStore from '@store/event-store/useEventStore.ts';
import actionSetEventForDetailsById from '@store/event-store/actions/actionSetEventForDetailsById.ts';
import actionRecalculateFilters from '@store/event-store/actions/actionRecalculateFilters.ts';

export function actionSetAllEventsAndRecalculateFilters(events: TWEvent[]) {
  // new array since we will sort it
  const newEvents = [...events];
  newEvents.sort((a, b) => a.twEventTimeMs - b.twEventTimeMs);

  // SET ALL EVENTS
  useEventStore.setState({ allEvents: newEvents });

  // RE-SET DETAIL EVENT -- if found
  const { eventForDetails } = useEventStore.getState();
  actionSetEventForDetailsById(eventForDetails?.twId);

  // REBUILD FILTERS, etc.
  actionRecalculateFilters();
}

import TWEvent from '@classes/data/TWEvent.ts';
import useEventStore from '@store/event-store/useEventStore.ts';
import getNewUpdateExistingEvents from '@utils//event-utils/getNewUpdateExistingEvents.ts';
import { actionSetAllEventsAndRecalculateFilters } from '@store/event-store/actions/actionSetAllEventsAndRecalculateFilters.ts';
import actionAddEventsToFilters from '@store/event-store/actions/actionAddEventsToFilters.ts';

export default function actionAddEvents(events: TWEvent[]) {
  if (!events) return;
  if (!events.length) return;

  const { allEvents } = useEventStore.getState();

  // Events can be "updates" to previous
  // events, so we need to merge them and update the original
  // but, we also don't want to add duplicates to the allEvents
  // nor do we want to add duplicates to the filters
  const { causedUpdates, newEvents } = getNewUpdateExistingEvents(events, allEvents);

  // bail - NO NEW EVENTS and NO UPDATES
  if (!newEvents.length && !causedUpdates) return;

  // WHEN THERE WERE UPDATES
  // an expensive path
  // we need to save the events and also recalculate the filters
  // since some filtered value could have changed
  if (causedUpdates) {
    actionSetAllEventsAndRecalculateFilters(allEvents.concat(newEvents));
  }

  // NEW EVENTS / NO UPDATES
  // this is the better path since we don't need to recalculate the filters
  // we simply need to add the new events to the allEvents and
  // add the new events to the filters as well.
  else {
    // new array since we will sort it
    const newAllEvents = [...allEvents, ...newEvents];
    newAllEvents.sort((a, b) => a.twEventTimeMs - b.twEventTimeMs);

    // SET ALL EVENTS
    useEventStore.setState({ allEvents: newAllEvents });

    // Add new events to filters
    actionAddEventsToFilters(newEvents);
  }
}

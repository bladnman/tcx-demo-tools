import useEventStore from '@pages/telemetry-viewer-page/store/event-store/useEventStore.ts';
import actionAddEventsToFilters from '@pages/telemetry-viewer-page/store/event-store/actions/actionAddEventsToFilters.ts';
import updateTVWithNewTV from '@pages/telemetry-viewer-page/utils/event-utils/updateTVWithNewTV.ts';

export default function actionAddEvents(events: TVEvent[]) {
  const { allEvents } = useEventStore.getState();

  // Events can be "updates" to previous
  // events, so we need to merge them and update the original
  // but, we also don't want to add duplicates to the allEvents
  // nor do we want to add duplicates to the filters
  const newEvents = events.filter((event) => {
    const previousEvent = allEvents.find((e) => e.id === event.id);
    // EXISTING - update the existing event
    if (previousEvent) {
      updateTVWithNewTV(previousEvent, event);
      return false;
    }
    // NEW
    else {
      return true;
    }
  });

  // NO NEW EVENTS
  if (!newEvents.length) return;

  //
  // SAVE ALL EVENTS
  useEventStore.setState({ allEvents: [...allEvents, ...newEvents] });

  //
  // UPDATE FILTERS
  // _will also update the display events_
  actionAddEventsToFilters(newEvents);
}

import useEventStore from '@store/event-store/useEventStore.ts';
import getNewUpdateExistingEvents from '@utils//event-utils/getNewUpdateExistingEvents.ts';
import { actionSetAllEventsAndRecalculateFilters } from '@store/event-store/actions/actionSetAllEventsAndRecalculateFilters.ts';
import eventSequencer from '@classes/telemetry-receiver/eventSequencer.ts';
import { actionSetSequences } from '@store/event-store/actions/actionSetSequences.ts';

export default function actionMergeEvents(events: TVEvent[]) {
  const { allEvents } = useEventStore.getState();

  /**
   * Since we are merging we need to do a few things by
   * hand.
   *
   * - update events or determine new events
   * - set new allEvents
   * - calculate & save new sequences
   */
  const { causedUpdates, newEvents } = getNewUpdateExistingEvents(events, allEvents);

  // NOTHING TO DO
  if (!causedUpdates && !newEvents.length) return;

  //
  // SET NEW ALL EVENTS
  // const newAllEvents = allEvents.concat(newEvents);
  const newAllEvents = [...allEvents, ...newEvents];
  actionSetAllEventsAndRecalculateFilters(newAllEvents);

  //
  // CALC & SAVE SEQUENCES
  const newSequences = eventSequencer(newAllEvents, {});
  actionSetSequences(newSequences);
}

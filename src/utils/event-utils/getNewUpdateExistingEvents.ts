import TWEvent from '@classes/data/TWEvent.ts';
import updateTWWithNewTW from '@utils/event-utils/updateTWWithNewTW.ts';

/**
 * This is a very specific function that is used when new events are
 * received. This function takes in the "allEvents" and the new events
 * and determines if the new events actually already exist. If they do,
 * they will simply be directly updated. If they do not, they will be
 * returned as new events.
 *
 * The caller will receive the new events (or an empty array) and a boolean
 * indicating if any updates were made.
 */
export default function getNewUpdateExistingEvents(
  toAddEvents: TWEvent[],
  existingEvents: TWEvent[],
) {
  let isDirty = false;
  // Events can be "updates" to previous
  // events, so we need to merge them and update the original
  // but, we also don't want to add duplicates to the existingEvents
  // nor do we want to add duplicates to the filters
  const newEvents: TWEvent[] = [];
  for (let i = 0; i < toAddEvents.length; i++) {
    const event = toAddEvents[i];
    if (!event?.twId) continue;

    // we need to check if the event already exists
    // this means in the existingEvents or in the newEvents
    // that we have already processed
    const previousEvent =
      existingEvents.find((e) => e.twId === event.twId) ??
      newEvents.find((e) => e.twId === event.twId);
    // EXISTING - update the existing event
    if (previousEvent) {
      isDirty = true;
      updateTWWithNewTW(previousEvent, event);
    }
    // NEW
    else {
      newEvents.push(event);
    }
  }

  return {
    causedUpdates: isDirty,
    newEvents,
  };
}

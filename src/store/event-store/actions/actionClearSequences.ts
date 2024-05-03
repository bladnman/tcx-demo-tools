import { actionSetSequences } from '@store/event-store/actions/actionSetSequences.ts';
import useEventStore from '@store/event-store/useEventStore.ts';

export default function actionClearSequences() {
  const allEvents = useEventStore.getState().allEvents;
  allEvents.forEach((event) => (event.sequenceData = {}));

  actionSetSequences({});
}

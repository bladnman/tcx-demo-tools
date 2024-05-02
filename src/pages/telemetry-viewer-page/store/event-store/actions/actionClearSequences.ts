import { actionSetSequences } from '@pages/telemetry-viewer-page/store/event-store/actions/actionSetSequences.ts';
import useEventStore from '@pages/telemetry-viewer-page/store/event-store/useEventStore.ts';

export default function actionClearSequences() {
  const allEvents = useEventStore.getState().allEvents;
  allEvents.forEach((event) => (event.sequenceData = {}));

  actionSetSequences({});
}

import useEventStore from '@pages/telemetry-viewer-page/store/event-store/useEventStore.ts';
import actionSetEventForDetailsById from '@pages/telemetry-viewer-page/store/event-store/actions/actionSetEventForDetailsById.ts';

export default function actionToggleEventForDetailsById(id?: string | null) {
  const { eventForDetails } = useEventStore.getState();

  // DESELECT - the event is already selected, deselect it
  if (!id || eventForDetails?.id === id) {
    actionSetEventForDetailsById(null);
  }

  // SELECT
  else {
    actionSetEventForDetailsById(id);
  }
}

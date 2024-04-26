import useEventStore from '@pages/telemetry-viewer-page/store/event-store/useEventStore.ts';
import useSettingsStore from '@pages/telemetry-viewer-page/store/settings-store/useSettingsStore.ts';
import { actionSetAllEvents } from '@pages/telemetry-viewer-page/store/event-store/actions/actionSetAllEvents.ts';
import getEventTags from '@pages/telemetry-viewer-page/utils/tag-utils/getEventTags.ts';

export default function actionRecalculateTags() {
  const allEvents = useEventStore.getState().allEvents;
  const tagConfigs = useSettingsStore.getState().tagConfigs;

  allEvents.forEach((event) => {
    event.tags = getEventTags(event, tagConfigs).map((tagConfig) => tagConfig.key);
  });
  actionSetAllEvents(allEvents);
}

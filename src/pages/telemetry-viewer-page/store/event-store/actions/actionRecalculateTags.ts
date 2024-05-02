import useEventStore from '@pages/telemetry-viewer-page/store/event-store/useEventStore.ts';
import useSettingsStore from '@pages/telemetry-viewer-page/store/settings-store/useSettingsStore.ts';
import { actionSetAllEventsAndRecalculateFilters } from '@pages/telemetry-viewer-page/store/event-store/actions/actionSetAllEventsAndRecalculateFilters.ts';
import getEventTags from '@pages/telemetry-viewer-page/utils/tag-utils/getEventTags.ts';

export default function actionRecalculateTags() {
  const allEvents = useEventStore.getState().allEvents;
  const tagConfigs = useSettingsStore.getState().tagConfigs;

  allEvents.forEach((event) => {
    event.tvTags = getEventTags(event, tagConfigs).map((tagConfig) => tagConfig.key);
  });
  actionSetAllEventsAndRecalculateFilters(allEvents);
}

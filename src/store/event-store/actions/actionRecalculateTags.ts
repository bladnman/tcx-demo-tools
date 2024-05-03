import useEventStore from '@store/event-store/useEventStore.ts';
import useSettingsStore from '@store/settings-store/useSettingsStore.ts';
import { actionSetAllEventsAndRecalculateFilters } from '@store/event-store/actions/actionSetAllEventsAndRecalculateFilters.ts';
import getEventTags from '@utils//tag-utils/getEventTags.ts';

export default function actionRecalculateTags() {
  const allEvents = useEventStore.getState().allEvents;
  const tagConfigs = useSettingsStore.getState().tagConfigs;

  allEvents.forEach((event) => {
    event.tvTags = getEventTags(event, tagConfigs).map((tagConfig) => tagConfig.key);
  });
  actionSetAllEventsAndRecalculateFilters(allEvents);
}

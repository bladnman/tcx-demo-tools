import useSettingsStore from '@store/settings-store/useSettingsStore.ts';
import getEventTags from '@utils/tag-utils/getEventTags.ts';

export default function eventTagger(events: TVEvent[]) {
  const tagConfigs = useSettingsStore.getState().tagConfigs;
  events.forEach(
    (event) =>
      (event.tvTags = getEventTags(event, tagConfigs).map((tagConfig) => tagConfig.key)),
  );
}

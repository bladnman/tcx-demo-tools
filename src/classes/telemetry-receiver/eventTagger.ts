import TWEvent from '@classes/data/TWEvent.ts';
import useSettingsStore from '@store/settings-store/useSettingsStore.ts';
import getEventTags from '@utils/tag-utils/getEventTags.ts';

export default function eventTagger(events: TWEvent[]) {
  const tagConfigs = useSettingsStore.getState().tagConfigs;
  events.forEach(
    (event) =>
      (event.twTags = getEventTags(event, tagConfigs)?.map((tagConfig) => tagConfig.key)),
  );
}

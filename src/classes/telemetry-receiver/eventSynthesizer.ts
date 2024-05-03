import CONST from '@const/CONST.ts';
import { getFailures, getPayloads } from '@utils/telemetry-utils.ts';
import getEventTags from '@utils/tag-utils/getEventTags.ts';
import useSettingsStore from '@store/settings-store/useSettingsStore.ts';

export default function eventSynthesizer(events: TVEvent[]) {
  const tagConfigs = useSettingsStore.getState().tagConfigs;
  events.forEach((event) => synthesizeEvent(event, tagConfigs));
}
function synthesizeEvent(event: TVEvent, tagConfigs: TagConfig[]) {
  const lastEvent = event.dispatchedEvents.at(-1)?.inputEvent ?? event.clientEvent;
  if (!lastEvent) {
    console.warn(`[🐽](eventMapper) NO EVENT DATA`, event);
    return;
  }
  event.tvVersion = CONST.TV_MESSAGE_VERSION;
  event.timeMs = new Date(lastEvent.timestamp).getTime();
  event.hasFailures = !!getFailures(event.dispatchedEvents);
  event.hasPayloads = !!getPayloads(event.dispatchedEvents);
  event.tvTags = getEventTags(event, tagConfigs).map((tagConfig) => tagConfig.key);
}

import mapClientEventToTV, {
  isClientEvent,
} from '@pages/telemetry-viewer-page/classes/telemetry-receiver/utils/mapClientEventToTV.ts';
import mapTDDispatchedToTV, {
  isTDDispatchedEvent,
} from '@pages/telemetry-viewer-page/classes/telemetry-receiver/utils/mapTDDispatchedToTV.ts';
import mapTVEventToTV, {
  isTVEvent,
} from '@pages/telemetry-viewer-page/classes/telemetry-receiver/utils/mapTVEventToTV.ts';
import mapUpgradeTVEventToTV, {
  isOldTVEvent,
} from '@pages/telemetry-viewer-page/classes/telemetry-receiver/utils/mapUpgradeTVEventToTV.ts';
import getEventTags from '@pages/telemetry-viewer-page/utils/tag-utils/getEventTags.ts';
import {
  getFailures,
  getPayloads,
} from '@pages/telemetry-viewer-page/utils/telemetry-utils.ts';
import CONST from '../../../../const/CONST.ts';
import useSettingsStore from '@pages/telemetry-viewer-page/store/settings-store/useSettingsStore.ts';

export default function eventMapper(events: unknown[]): TVEvent[] {
  return events.map(mapEvent).filter((e) => e !== null) as TVEvent[];
}
function mapEvent(event: unknown): TVEvent | null {
  if (!event) return null;
  const getTvEvent = (event: unknown): TVEvent | null => {
    if (isTVEvent(event)) return mapTVEventToTV(event);
    if (isOldTVEvent(event)) return mapUpgradeTVEventToTV(event);
    if (isClientEvent(event)) return mapClientEventToTV(event);
    if (isTDDispatchedEvent(event)) return mapTDDispatchedToTV(event);

    // look for an explicit ".clientEvent"
    const { clientEvent } = event as Hash;
    if (isClientEvent(clientEvent)) return mapClientEventToTV(clientEvent);

    const { dispatchedEvents = [] } = (event as Hash) ?? {};
    if (dispatchedEvents.length) {
      const dispatchedEvent = dispatchedEvents[0];
      if (isTDDispatchedEvent(dispatchedEvent))
        return mapTDDispatchedToTV(dispatchedEvent);
    }

    return null;
  };

  // GET A TV EVENT from the event object
  const tvEvent = getTvEvent(event);

  // NOT A TV EVENT
  if (!tvEvent) {
    console.warn(`[🐽](eventMapper) UNMAPPED event`, event);
    return null;
  }

  const lastEvent = tvEvent.dispatchedEvents.at(-1)?.inputEvent;
  if (!lastEvent) {
    console.warn(`[🐽](eventMapper) NO LAST EVENT`, tvEvent);
    return null;
  }

  ///
  /// POST-PROCESSING
  /// all events need to have certain properties
  /// this is the place those are added
  ///
  const tagConfigs = useSettingsStore.getState().tagConfigs;
  tvEvent.tvVersion = CONST.TV_MESSAGE_VERSION;
  tvEvent.timeMs = new Date(lastEvent.timestamp).getTime();
  tvEvent.hasFailures = !!getFailures(tvEvent.dispatchedEvents);
  tvEvent.hasPayloads = !!getPayloads(tvEvent.dispatchedEvents);
  tvEvent.tags = getEventTags(tvEvent, tagConfigs).map((tagConfig) => tagConfig.key);

  return tvEvent;
}

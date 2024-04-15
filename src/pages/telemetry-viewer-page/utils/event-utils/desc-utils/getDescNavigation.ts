import getObjectValue from '@pages/telemetry-viewer-page/utils/getObjectValue.ts';
import FIELD_DEF from '@pages/telemetry-viewer-page/constants/FIELD_DEF.ts';
import { getSimpleSceneName } from '@pages/telemetry-viewer-page/utils/telemetry-utils.ts';
import { getEventDef } from '@pages/telemetry-viewer-page/utils/event-utils/getEventDef.ts';

export default function getDescNavigation(event: TVEvent) {
  const eventDef = getEventDef(event);

  let highlight = getObjectValue(event, FIELD_DEF.locationScene.paths) as
    | string
    | null;
  const message = getObjectValue(event, FIELD_DEF.interactCta.paths);
  const appName = getObjectValue(event, FIELD_DEF.appName.paths);

  // Special case for game hub locations -- SO WORDY
  if (appName === 'game-hub' || highlight?.includes('game hub:')) {
    highlight = getSimpleSceneName(highlight);
  }

  return {
    highlight,
    message,
    color: `${eventDef.color}.main`,
  };
}

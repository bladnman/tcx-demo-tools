import {
  isTVEventCurrentVersion,
  isTVEventShape,
} from '@pages/telemetry-viewer-page/classes/telemetry-receiver/utils/mapTVEventToTV.ts';
import CONST from '../../../../../CONST.ts';

export function isOldTVEvent(event: unknown): boolean {
  if (!isTVEventShape(event)) return false;
  return !isTVEventCurrentVersion(event);
}
export default function mapUpgradeTVEventToTV(event: unknown): TVEvent | null {
  if (!isOldTVEvent(event)) return null;

  // MORE UPGRADE STEPS IN THE FUTURE HERE
  (event as TVEvent).tvVersion = CONST.TV_MESSAGE_VERSION;

  return event as TVEvent;
}

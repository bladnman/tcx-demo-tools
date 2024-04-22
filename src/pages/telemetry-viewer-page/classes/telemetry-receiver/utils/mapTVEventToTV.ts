import { isObjectWithRequiredKeys } from '@pages/telemetry-viewer-page/utils/telemetry-utils.ts';
import CONST from '../../../../../CONST.ts';

export function isTVEventShape(event: unknown): boolean {
  return isObjectWithRequiredKeys(event, [
    'appName',
    'namespace',
    'timestamp',
    'timeMs',
    'type',
  ]);
}
export function isTVEventCurrentVersion(event: unknown): boolean {
  return (event as TVEvent).tvVersion === CONST.TV_MESSAGE_VERSION;
}
export function isTVEvent(event: unknown): boolean {
  if (!isTVEventShape(event)) return false;
  return isTVEventCurrentVersion(event);
}
export default function mapTVEventToTV(event: unknown): TVEvent | null {
  if (!isTVEvent(event)) return null;
  return event as TVEvent;
}

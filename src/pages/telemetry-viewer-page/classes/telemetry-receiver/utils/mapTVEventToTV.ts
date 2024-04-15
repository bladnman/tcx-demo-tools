import { isObjectWithRequiredKeys } from '@pages/telemetry-viewer-page/utils/telemetry-utils.ts';

export function isTVEvent(event: unknown): boolean {
  return isObjectWithRequiredKeys(event, [
    'appName',
    'namespace',
    'timestamp',
    'type',
  ]);
}
export default function mapTVEventToTV(event: unknown): TVEvent | null {
  if (!isTVEvent(event)) return null;
  return event as TVEvent;
}

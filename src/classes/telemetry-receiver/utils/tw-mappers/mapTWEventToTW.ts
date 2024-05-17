import TWEvent from '@classes/data/TWEvent.ts';
import { isObjectWithRequiredKeys } from '@utils/telemetry-utils.ts';
import CONST from '@const/CONST.ts';

export function isTWEventShape(event: unknown): boolean {
  return isObjectWithRequiredKeys(event, ['twType', 'twId', 'rawEvent']);
}
export function isTWEventCurrentVersion(event: unknown): boolean {
  return (event as TWEvent).twVersion === CONST.TV_MESSAGE_VERSION;
}
export function isTWEvent(event: unknown): boolean {
  if (!isTWEventShape(event)) return false;
  return isTWEventCurrentVersion(event);
}
export default function mapTWEventToTW(event: unknown): TWEvent | null {
  if (!isTWEvent(event)) return null;
  const twEvent = event as TWEvent;

  // We need to create an instance, not
  // simply the shape -- instance has methods
  return new TWEvent({
    twType: twEvent.twType,
    twEventTimeMs: twEvent.twEventTimeMs,
    twId: twEvent.twId,
    rawEvent: twEvent.rawEvent,

    failures: twEvent.failures,
    payloads: twEvent.payloads,
    filtered: twEvent.filtered,
  }) as TWEvent;
}

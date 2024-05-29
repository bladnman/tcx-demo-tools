import TWEvent from '@classes/data/TWEvent.ts';
import { isTWEventCurrentVersion, isTWEventShape } from './mapTWEventToTW.ts';
import CONST from '@const/CONST.ts';

export function isOldTWEvent(event: unknown): boolean {
  if (!isTWEventShape(event)) return false;
  return !isTWEventCurrentVersion(event);
}
export default function mapUpgradeTWEventToTW(event: unknown): TWEvent | null {
  if (!isOldTWEvent(event)) return null;

  // MORE UPGRADE STEPS IN THE FUTURE HERE
  (event as TWEvent).twVersion = CONST.TV_MESSAGE_VERSION;

  return event as TWEvent;
}

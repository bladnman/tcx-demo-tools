import TWEvent from '@classes/data/TWEvent.ts';
import { EventTypes } from '@const/event-types.ts';
import { EVENT_TYPE_DEF } from '@const/EVENT_TYPE.ts';
import { includesAny } from '@utils/telemetry-utils.ts';

export default function getEventDefColor(eventOrType: TWEvent | string): string {
  const defaultColor = 'appBrown';
  const twType =
    typeof eventOrType === 'string' ? eventOrType : (eventOrType as TWEvent).twType;
  const isKnownNative =
    typeof eventOrType === 'string'
      ? false
      : (eventOrType as TWEvent).getStr('namespace')?.includes('native');

  if (!twType) return defaultColor;

  // some have an explicit definition
  const def = EVENT_TYPE_DEF[twType as EventTypes];
  if (def?.color) return def.color;

  // overrides
  if (includesAny(twType, ['Error', 'Failure', 'Dropped', 'Crash'], false)) {
    return 'appMaroon';
  } else if (includesAny(twType, ['BGS'], false)) {
    return 'appPurple';
  } else if (includesAny(twType, ['Stat'], false)) {
    return 'appIndigo';
  } else if (includesAny(twType, ['NpWebApi'], false)) {
    return 'appEggplant';
  } else if (includesAny(twType, ['background'], false)) {
    return 'appSlate';
  } else if (includesAny(twType, ['drm'], false)) {
    return 'appBronze';
  } else if (includesAny(twType, ['Ime'], true)) {
    return 'appBrown';
  } else if (includesAny(twType, ['Power'], false)) {
    return 'appNeonGreen';
  }

  // default
  return isKnownNative ? 'appOrange' : defaultColor;
}

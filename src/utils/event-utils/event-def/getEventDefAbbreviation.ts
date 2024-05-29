import TWEvent from '@classes/data/TWEvent.ts';
import { EventTypes } from '@const/event-types.ts';
import { EVENT_TYPE_DEF } from '@const/EVENT_TYPE.ts';
import { includesAny } from '@utils/telemetry-utils.ts';

export default function getEventDefAbbreviation(eventOrType: TWEvent | string): string {
  const defaultColor = 'appBrown';
  const twType =
    typeof eventOrType === 'string' ? eventOrType : (eventOrType as TWEvent).twType;

  if (!twType) return defaultColor;

  // some have an explicit definition
  const def = EVENT_TYPE_DEF[twType as EventTypes];
  if (def?.abbreviation) return def.abbreviation;

  // OVERRIDES
  if (includesAny(twType, ['Error', 'Failure', 'Dropped'], false)) {
    return 'err';
  } else if (includesAny(twType, ['BGS'], false)) {
    return 'bgs';
  } else if (includesAny(twType, ['drm'], false)) {
    return 'drm';
  } else if (includesAny(twType, ['NpWebApi'], false)) {
    return 'wApi';
  } else if (includesAny(twType, ['background'], false)) {
    return 'bg';
  } else if (includesAny(twType, ['Ime'], true)) {
    return 'ime';
  } else if (includesAny(twType, ['Power'], false)) {
    return 'power';
  } else if (includesAny(twType, ['Stat'], false)) {
    return 'stat';
  }

  // default to OTHER
  return 'other';
}

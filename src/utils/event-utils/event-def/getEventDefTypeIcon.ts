import TWEvent from '@classes/data/TWEvent.ts';
import { EventTypes } from '@const/event-types.ts';
import { EVENT_TYPE_DEF } from '@const/EVENT_TYPE.ts';
import { includesAny } from '@utils/telemetry-utils.ts';

export default function getEventDefTypeIcon(eventOrType: TWEvent | string): string {
  const defaultIcon = '🔹';
  const twType =
    typeof eventOrType === 'string' ? eventOrType : (eventOrType as TWEvent).twType;
  if (!twType) return defaultIcon;

  const def = EVENT_TYPE_DEF[twType as EventTypes];
  if (def?.typeIcon) return def.typeIcon;

  // General
  if (includesAny(twType, ['Stat'], false)) {
    return '📊';
  }

  return defaultIcon;
}

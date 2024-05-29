import TWEvent from '@classes/data/TWEvent.ts';
import { EventTypes } from '@const/event-types.ts';
import { EVENT_TYPE_DEF } from '@const/EVENT_TYPE.ts';

export default function getEventDefType(eventOrType: TWEvent | string): string {
  const defaultValue = 'Other';
  const twType =
    typeof eventOrType === 'string' ? eventOrType : (eventOrType as TWEvent).twType;

  if (!twType) return defaultValue;

  // some have an explicit definition
  const def = EVENT_TYPE_DEF[twType as EventTypes];
  if (def?.type) return def.type;

  return defaultValue;
}

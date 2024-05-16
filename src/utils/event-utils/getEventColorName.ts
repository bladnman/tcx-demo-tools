import TWEvent from '@classes/data/TWEvent.ts';
import { EventTypes } from '@const/event-types.ts';
import { EVENT_TYPE_DEF } from '@const/EVENT_TYPE.ts';

export default function getEventColorName(
  event: TWEvent,
  defaultColor: string = 'fg',
): string {
  return EVENT_TYPE_DEF[event.twType as EventTypes]?.color ?? defaultColor;
}

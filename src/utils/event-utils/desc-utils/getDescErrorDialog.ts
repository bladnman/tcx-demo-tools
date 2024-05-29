import TWEvent from '@classes/data/TWEvent.ts';
import { getEventDef } from '@utils/event-utils/event-def/getEventDef.ts';

export default function getDescErrorDialog(event: TWEvent) {
  const eventDef = getEventDef(event);

  const message = event.getStr(['description', 'message']);
  const highlight = 'Error Dialog';
  const color = `${eventDef.color}.main`;

  return {
    highlight,
    message,
    color,
  };
}

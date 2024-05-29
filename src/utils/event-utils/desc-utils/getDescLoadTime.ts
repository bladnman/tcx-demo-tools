import TWEvent from '@classes/data/TWEvent.ts';
import { getEventDef } from '@utils/event-utils/event-def/getEventDef.ts';
import { getLoadTimeDetails } from '@utils//getLoadTimeDetails.ts';

export default function getDescLoadTime(event: TWEvent) {
  const eventDef = getEventDef(event);

  const loadTimeData = getLoadTimeDetails(event);
  const message = loadTimeData?.message;
  const highlight = loadTimeData?.highlight;
  let color = `${eventDef.color}.main`;
  if (message?.includes('timeToInteractive')) {
    color = 'appOrange.main';
  }

  return {
    highlight,
    message,
    color,
  };
}

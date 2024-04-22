import { getEventDef } from '@pages/telemetry-viewer-page/utils/event-utils/getEventDef.ts';
import { getLoadTimeDetails } from '@pages/telemetry-viewer-page/utils/getLoadTimeDetails.ts';

export default function getDescLoadTime(event: TVEvent) {
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

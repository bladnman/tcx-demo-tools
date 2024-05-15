import CONST from '@const/CONST.ts';
import { getFailures, getPayloads } from '@utils/telemetry-utils.ts';

export default function eventSynthesizer(events: TVEvent[]) {
  events.forEach(synthesizeEvent);
}
function synthesizeEvent(event: TVEvent) {
  const lastEvent = event.dispatchedEvents.at(-1)?.inputEvent ?? event.clientEvent;
  if (!lastEvent) {
    console.warn(`[🐽](eventMapper) NO EVENT DATA`, event);
    return;
  }
  event.tvVersion = CONST.TV_MESSAGE_VERSION;
  event.timeMs = new Date(lastEvent.timestamp).getTime();
  event.hasFailures = !!getFailures(event.dispatchedEvents);
  event.hasPayloads = !!getPayloads(event.dispatchedEvents);
}

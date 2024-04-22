import {
  getFailures,
  getPayloads,
} from '@pages/telemetry-viewer-page/utils/telemetry-utils.ts';

export default function updateTVWithNewTV(
  previousEvent: TVEvent,
  newEvent: TVEvent | null,
) {
  previousEvent.dispatchedEvents = previousEvent.dispatchedEvents ?? [];

  // add on any dispatched events
  previousEvent.dispatchedEvents.push(...(newEvent?.dispatchedEvents ?? []));

  // certain things from the new event should be copied over
  previousEvent.hasFailures = !!getFailures(previousEvent.dispatchedEvents);
  previousEvent.hasPayloads = !!getPayloads(previousEvent.dispatchedEvents);
  previousEvent.tags = newEvent?.tags ?? [];
  previousEvent.updateTimeMs = new Date().getTime();
}

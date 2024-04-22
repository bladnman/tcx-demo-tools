import {
  getFailures,
  getPayloads,
  isObjectWithRequiredKeys,
} from '@pages/telemetry-viewer-page/utils/telemetry-utils.ts';
import CONST from '../../../../../CONST.ts';

export interface TDDispatchedEvent {
  failures: Hash;
  filteredEvent: Hash;
  inputEvent: TelemetryDebuggerDispatchedEvent;
  payloads: Hash;
}
export function isTDDispatchedEvent(event: unknown): boolean {
  return isObjectWithRequiredKeys(event, ['failures', 'inputEvent', 'payloads']);
}
export default function mapTDDispatchedToTV(event: unknown): TVEvent | null {
  if (!isTDDispatchedEvent(event)) return null;

  const tdDispatchedEvent = event as TDDispatchedEvent;

  const inputEvent = (tdDispatchedEvent.inputEvent ?? {}) as Hash;
  const { appName, tracingId } = inputEvent;
  // NO TRACING ID, NO EVENT
  if (!tracingId) return null;

  // this event we received is the "dispatched" event
  // we need create a single-item array with that event
  // so that we can map it to the TVEvent
  const dispatchedEvents = [tdDispatchedEvent];
  const type = inputEvent.type ?? 'unknown';
  return {
    type,
    eventName: type,
    appName: appName ?? undefined, // no nulls
    platformType: inputEvent.platformType,
    namespace: inputEvent.namespace ?? 'native',
    timestamp: inputEvent.timestamp,
    timeMs: new Date(inputEvent.timestamp).getTime(),
    hasFailures: !!getFailures(dispatchedEvents),
    hasPayloads: !!getPayloads(dispatchedEvents),
    id: tracingId,
    tvVersion: CONST.TV_MESSAGE_VERSION,
    clientEvent: undefined,
    dispatchedEvents: [tdDispatchedEvent],
  } as TVEvent;
}

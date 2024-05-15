import TWEvent from '@classes/data/TWEvent.ts';
import { isObjectWithRequiredKeys } from '@utils/telemetry-utils.ts';

export interface TDDispatchedEvent {
  failures: Hash;
  filteredEvent: Hash;
  inputEvent: TelemetryDebuggerDispatchedEvent;
  payloads: Hash;
}
export function isTDDispatchedEvent(event: unknown): boolean {
  return isObjectWithRequiredKeys(event, ['failures', 'inputEvent', 'payloads']);
}
export default function mapTDDispatchedToTW(event: unknown): TWEvent | null {
  if (!isTDDispatchedEvent(event)) return null;

  const hashEvent = event as Hash;
  const inputEvent = hashEvent?.inputEvent as Hash;

  // verify required keys
  if (!inputEvent?.tracingId) return null;
  if (!inputEvent?.timestamp) return null;
  if (!inputEvent?.type) return null;

  return new TWEvent({
    twType: inputEvent.type,
    twEventTimeMs: new Date(inputEvent.timestamp).getTime(),
    twId: inputEvent.tracingId,
    rawEvent: inputEvent,

    failures: hashEvent.failures,
    payloads: hashEvent.payloads,
    filtered: hashEvent.filteredEvent,
  });
}

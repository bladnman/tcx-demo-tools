import TWEvent from '@classes/data/TWEvent.ts';
import { isObjectWithRequiredKeys } from '@utils/telemetry-utils.ts';
import { v4 as uuidV4 } from 'uuid';

export interface RawClientEvent {
  appName: string;
  namespace: string;
  timestamp: string;
  type: string;
  tracingId: string;
  platformType?: string;
}
export function isClientEvent(event: unknown): boolean {
  const eventHash = event as Hash;
  const requiredKeys = ['appName', 'timestamp', 'type'];

  // in some cases the clientEvent is nested
  if (eventHash?.clientEvent) {
    return isObjectWithRequiredKeys(eventHash.clientEvent, requiredKeys);
  }
  return isObjectWithRequiredKeys(eventHash, requiredKeys);
}
export default function mapClientEventToTW(event: unknown): TWEvent | null {
  if (!isClientEvent(event)) return null;
  const eventHash = event as Hash;
  const rawEvent =
    (eventHash?.clientEvent as RawClientEvent) ?? (eventHash as RawClientEvent);

  // raw events (client events) will have a tracingId
  // if they were published by UT, but not when we publish
  // at the "client" level. So, we need to use the tracingId.
  rawEvent.tracingId = rawEvent.tracingId ?? uuidV4();

  // verify required keys
  if (!rawEvent?.tracingId) return null;
  if (!rawEvent?.timestamp) return null;
  if (!rawEvent?.type) return null;

  return new TWEvent({
    twType: rawEvent.type,
    twEventTimeMs: new Date(rawEvent.timestamp).getTime(),
    twId: rawEvent.tracingId,
    rawEvent: rawEvent,
  });
}

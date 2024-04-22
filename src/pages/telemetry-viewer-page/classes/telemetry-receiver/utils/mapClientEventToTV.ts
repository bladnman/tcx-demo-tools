import { isObjectWithRequiredKeys } from '@pages/telemetry-viewer-page/utils/telemetry-utils.ts';
import { v4 as uuidV4 } from 'uuid';
import CONST from '../../../../../CONST.ts';

export interface RawClientEvent {
  appName: string;
  namespace: string;
  timestamp: string;
  type: string;
  tracingId: string;
  platformType?: string;
}
export function isClientEvent(event: unknown): boolean {
  return isObjectWithRequiredKeys(event, ['appName', 'namespace', 'timestamp', 'type']);
}
export default function mapClientEventToTV(event: unknown): TVEvent | null {
  if (!isClientEvent(event)) return null;

  const rawEvent = event as RawClientEvent;
  const { appName, namespace, type, platformType, timestamp } = rawEvent;
  // raw events (client events) will have a tracingId
  // if they were published by UT, but not when we publish
  // at the "client" level. So, we need to use the tracingId.
  rawEvent.tracingId = rawEvent.tracingId ?? uuidV4();

  return {
    type,
    eventName: type,
    appName: appName ?? undefined, // no nulls
    platformType,
    namespace,
    timestamp,
    timeMs: new Date(timestamp).getTime(),
    hasFailures: false,
    hasPayloads: false,
    id: rawEvent.tracingId,
    tvVersion: CONST.TV_MESSAGE_VERSION,
    clientEvent: rawEvent,
    dispatchedEvents: [],
    tags: [],
  } as TVEvent;
}

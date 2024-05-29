import TWEvent from '@classes/data/TWEvent.ts';
import { fLeft, fRight } from '@utils/MU.ts';
import getObjectValue from '@utils/object-value-utils/getObjectValue.ts';
import {
  isObjectWithAnyRequiredKeys,
  isObjectWithRequiredKeys,
} from '@utils/telemetry-utils.ts';
import uuid from 'react-uuid';

export interface RawImplyEvent {
  appName: string;
  namespace: string;
  tracingId: string;
  eventId: string;
  type: string;
  timestamp: string;
  platformType?: string;
}
export function isMerlinEvent(event: unknown): boolean {
  const eventHash = event as Hash;
  // const requiredKeys = ['__time'];
  const requiredKeys = ['systemSoftwareVersion', 'vshBuildNumber'];

  // in some cases the clientEvent is nested
  if (eventHash?.clientEvent) {
    return isObjectWithAnyRequiredKeys(eventHash.clientEvent, requiredKeys);
  }
  return isObjectWithAnyRequiredKeys(eventHash, requiredKeys);
}
export default function mapMerlinEventToTW(event: unknown): TWEvent | null {
  if (!isMerlinEvent(event)) return null;
  const eventHash = event as Hash;
  const rawEvent =
    (eventHash?.clientEvent as RawImplyEvent) ?? (eventHash as RawImplyEvent);

  // EVENT TYPE
  // in Merlin data this is a complicated field
  // in many cases it is a string with the eventId
  // but this string also carries the namespace
  // because of this you will see up splitting on the ":"
  // In other cases the type is a string with the eventType
  // this can be seen in "gameplay" events where it will be "SessionEnd"
  const eventTypeFull = getObjectValue(rawEvent, ['eventId', 'eventType']) as string;
  if (!eventTypeFull) return null;

  if (eventTypeFull.includes(':')) {
    rawEvent.type = fRight(eventTypeFull, ':');
    rawEvent.namespace = fLeft(eventTypeFull, ':');
  } else {
    rawEvent.type = eventTypeFull;
    rawEvent.namespace = 'native';
  }

  // TRACING ID
  // This is also not always present in Merlin data
  // In some events this is missing and we need to create
  // our own.
  if (!rawEvent?.tracingId) {
    rawEvent.tracingId = `SYNTH_${uuid()}`;
  }

  // verify required keys
  if (!rawEvent?.timestamp) return null;
  if (!rawEvent?.type) return null;

  return new TWEvent({
    twType: rawEvent.type,
    twEventTimeMs: new Date(rawEvent.timestamp).getTime(),
    twId: rawEvent.tracingId,
    rawEvent: rawEvent,
  });
}

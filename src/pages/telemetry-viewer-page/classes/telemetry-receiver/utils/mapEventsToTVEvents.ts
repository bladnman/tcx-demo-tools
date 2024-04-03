import {
  arrayLastItem,
  getFailures,
  getPayloads,
} from '@pages/telemetry-viewer-page/utils/telemetry-utils.ts';

export default function mapEventsToTVEvents(events: unknown[]): TVEvent[] {
  return events.map(mapEvent).filter((e) => e !== null) as TVEvent[];
}
function mapEvent(event: unknown): TVEvent | null {
  const tdEvent = mapUnknownToTDEvent(event);
  if (!tdEvent) return null;

  const { id, appName, eventName, clientEvent, dispatchedEvents } = tdEvent;
  const lastDispatchedEvent = arrayLastItem(tdEvent.dispatchedEvents);

  const inputEvent = lastDispatchedEvent?.inputEvent;
  const type = clientEvent?.type ?? inputEvent?.type ?? 'unknown';
  const namespace =
    clientEvent?.namespace ?? inputEvent?.namespace ?? !!clientEvent
      ? 'client'
      : 'native';

  const platformType =
    tdEvent.clientEvent?.platformType ??
    lastDispatchedEvent?.inputEvent?.platformType;

  const finalDispatchedEvents = dispatchedEvents ?? [];

  // CONVERT TO A TV EVENT
  // naming them each here to create a layout for our
  // detail view. this order will be displayed in the JSON
  // viewer. Nice to have the expanding elements at the bottoms
  // and the keys and ids at the top.
  return {
    type,
    namespace,
    platformType,
    appName: appName ?? undefined,
    eventName,
    // "proof" properties need to be added to the actionAddEvents function
    hasFailures: !!getFailures(finalDispatchedEvents),
    hasPayloads: !!getPayloads(finalDispatchedEvents),
    id,
    clientEvent,
    dispatchedEvents: finalDispatchedEvents,
  } as TVEvent;
}

/**
 * The old event format from Telemetry Debugger is our "core" event format.
 * But the TDServer used to synthesize some of the values in the event structure.
 * If we receive events **directly** from UT or clients they will not have this
 * structure. We need to map them to the "core" event format.
 */
function mapUnknownToTDEvent(event: unknown): TelemetryDebuggerEvent | null {
  // INVALID EVENT
  // First, check if event is not null and is of type object
  if (!event || typeof event !== 'object' || Array.isArray(event)) return null;

  // ALREADY A TD EVENT
  // Duck typing to check if the event is already in the correct format
  if ('id' in event && 'eventName' in event && 'appName' in event) {
    return event as TelemetryDebuggerEvent;
  }

  // MAP TO TD EVENT
  const tdEvent = event as
    | TelemetryDebuggerEvent
    | TelemetryDebuggerDispatchedEvent;

  const isDispatchedEvent = 'payloads' in tdEvent || 'inputEvent' in tdEvent;
  const clientEvent = isDispatchedEvent ? undefined : (tdEvent as Hash);
  const inputEvent = (tdEvent as TelemetryDebuggerDispatchedEvent).inputEvent;
  const appName = clientEvent?.appName ?? inputEvent?.appName;
  const id = clientEvent?.tracingId ?? inputEvent?.tracingId;

  if (!id) return null;

  return {
    id,
    appName,
    clientEvent,
    dispatchedEvents: isDispatchedEvent
      ? [tdEvent as TelemetryDebuggerDispatchedEvent]
      : null,
  } as TelemetryDebuggerEvent;
}

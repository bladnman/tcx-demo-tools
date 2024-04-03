import { EVENT_TYPE_DEF } from '../constants/EVENT_TYPE.ts';
import { EventTypes } from '../types/event-types.ts';

export function getEventDef(event: TVEvent) {
  return EVENT_TYPE_DEF[event.type as EventTypes] ?? EVENT_TYPE_DEF.Other;
}
export function getImpressionMessage(event: Hash) {
  const values = [
    _getEventStr(event, 'visualEntityType'),

    _getEventStr(event, 'tilePosition', 'position'),
    _getEventStr(event, 'actionCardPosition', 'position'),

    _getEventStr(event, 'uamActivityType'),
    _getEventStr(event, 'tournamentId'),
    _getEventStr(event, 'actionCardType', 'action card'),
    _getEventStr(event, 'actionCardPrimaryMessage'),
    _getEventStr(event, 'interactCta'),
    _getEventStr(event, 'tileContent'),
    _getEventStr(event, 'ugcMediaType'),
    _getEventStr(event, 'ugcMediaPlatform'),
    _getEventStr(event, 'officialNewsStoryHeadline'),
    _getEventStr(event, 'officialNewsStoryType'),
    _getEventStr(event, 'mediaContentType'),
  ];
  return values.filter((v) => v !== undefined).join(' | ');
}

/** INTERACTION EVENTS */
export function getInteractionMessage(event: Hash) {
  const values = [
    _getEventStr(event, 'interactAction'),
    _getEventStr(event, 'interactCta'),
  ];
  return values.filter((v) => v !== undefined).join(' | ');
}

/** NAVIGATION EVENTS */
export function getNavigationMessage(event: Hash) {
  const referrerApplicationName = _getEventStr(
    event,
    'referrerApplicationName',
  );
  let simpleReferrerScene = getSimpleSceneName(
    _getEventStr(event, 'referrerScene'),
  );
  if (referrerApplicationName !== 'game-hub') {
    simpleReferrerScene = `${referrerApplicationName} : ${simpleReferrerScene}`;
  }
  return `[${simpleReferrerScene}] -> [${getSimpleSceneName(event.locationScene)}]`;
}

/** LOAD TIME EVENTS */
export function getLoadTimeMessageList(event: Hash) {
  /** Example
   * LoadTime metrics are an array of metrics
   event.metricsData = [ {
   timestamp       : '2022-11-03T21:46:00.942Z',
   metricGroup     : 'initialLoad',
   metricSegment   : 'PostPurchaseScreen',
   metric          : 'fetchCoverUAM',
   startTime       : 6458,
   latency         : 51,
   metricType      : '' },
   ...]
   */
  const messages: string[] = [];
  event.metricsData.forEach((metric: Hash) => {
    const ttiTag = metric.metric === 'timeToInteractive' ? '🏁 ' : '';
    messages.push(`${ttiTag}[${metric.latency}ms] ${metric.metric}`);
  });
  return messages;
}

/** START UP EVENTS */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function getStartUpMessage(_event: Hash) {
  return `Start-up      *   *   *   *   *   *`;
}

/** ERROR EVENTS */
export function getErrorMessage(event: Hash) {
  const hex = _getEventStr(event, 'vshErrorHexCode');
  const isClientCompKey =
    hex?.indexOf('0x817608') === 0 ? 'CLIENT' : 'COMPONENT';
  const values = [
    isClientCompKey,
    hex,
    _getEventStr(event, 'severity'),
    _getEventStr(event, 'errorSubType'),
    _getEventStr(event, 'errorType'),
    _getEventStr(event, 'errorMessage'),
    _getEventStr(event, 'apiUrl'),
  ];
  return values.filter((v) => v !== undefined).join(' | ');
}
export function getSimpleSceneName(fromValue: string | undefined): string {
  if (fromValue === undefined) return '';

  // strip scene from locations if a GH value
  if (fromValue.indexOf(':') > -1) {
    const parts = fromValue.split(':');
    if (parts.length === 3) return parts[1];
    if (parts.length > 3) return parts[1] + ':' + parts[2];
  }

  // otherwise just the value
  return fromValue;
}
function _getEventStr(event: Hash, field: string, prefix?: string) {
  const val = event[field];
  if (val === undefined) return undefined;
  return [prefix, val].filter((v) => v !== undefined).join(': ');
}
export function cleanedFieldValue(
  field: string | undefined,
  value: string | undefined,
) {
  if (!field || !value) return value;
  switch (field) {
    case 'locationScene':
      return getSimpleSceneName(value);
    default:
      return value;
  }
}
export function getValueFromEvent(event: TVEvent, field: string) {
  const clientEvent = event?.clientEvent ?? {};
  const firstDispatched = event?.dispatchedEvents?.[0] ?? {};
  const inputEvent = (firstDispatched as Hash).inputEvent ?? {};
  const filteredEvent = (firstDispatched as Hash).filteredEvent ?? {};
  const value = getFromFirst([clientEvent, inputEvent, filteredEvent], field);
  return cleanedFieldValue(field, value);
}
export function getFromFirst(objects: Hash[], field: string) {
  for (const obj of objects) {
    if (obj[field]) return obj[field];
  }
  return undefined;
}
export function arrayLastItem<T>(array: T[] | undefined | null): T | undefined {
  if (!array) return undefined;
  return array[array.length - 1] as T;
}
export function getFailures(
  dispatchedEvents: TelemetryDebuggerDispatchedEvent[] | undefined | null,
) {
  const lastDispatchedEvent = arrayLastItem(dispatchedEvents);
  const failures = lastDispatchedEvent?.failures;

  // failures seems to be {} empty object by default
  if (Object.keys(failures ?? {}).length < 1) return undefined;

  return failures;
}
export function getPayloads(
  dispatchedEvents: TelemetryDebuggerDispatchedEvent[] | undefined | null,
) {
  if (!dispatchedEvents || dispatchedEvents.length < 1) return undefined;

  const payloads = [];
  for (const dispatchedEvent of dispatchedEvents) {
    if (dispatchedEvent.payloads) {
      payloads.push(dispatchedEvent.payloads);
    }
  }

  if (payloads.length === 0) return undefined;

  return payloads;
}

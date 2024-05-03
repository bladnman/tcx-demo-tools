export function includesAny(str: string, substrings: string[], caseSensitive = true) {
  if (caseSensitive) return substrings.some((substring) => str.includes(substring));
  return substrings.some((substring) =>
    str.toLowerCase().includes(substring.toLowerCase()),
  );
}

export function getSimpleSceneName(fromValue: string | undefined | null): string {
  if (!fromValue) return '';

  // strip scene from locations if a GH value
  // example ->   "locationScene":"post:cover:SWQA App e1 "
  //              "locationScene":"post:ugc:detail:SWQA App e1 "
  //              "locationScene":"post:add ons:SWQA App e1 "
  //              "locationScene":"pre:ratings and friends who play:overview:Marvel's Spider Man-Game of the Year"
  //              "locationScene":"pre:news:Marvel's Spider Man-Game of the Year"
  if (fromValue.indexOf(':') > -1) {
    const parts = fromValue.split(':');
    if (parts.length === 3) return parts[1];
    if (parts.length > 3) return parts[1] + ':' + parts[2];
  }

  // otherwise just the value
  return fromValue;
}
export function getValueFromEvent(event: TVEvent, field: string) {
  const clientEvent = event?.clientEvent ?? {};
  const firstDispatched = event?.dispatchedEvents?.[0] ?? {};
  const inputEvent = (firstDispatched as Hash).inputEvent ?? {};
  const filteredEvent = (firstDispatched as Hash).filteredEvent ?? {};
  return getFromFirst([clientEvent, inputEvent, filteredEvent], field);
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
export function getPreviousItems<T>(items: T[], upToItem: T, includeItem = true): T[] {
  let targetIndex = items.findIndex((item) => item === upToItem);
  if (targetIndex === -1) return [];

  if (includeItem) targetIndex += 1;
  return targetIndex !== -1 ? items.slice(0, targetIndex) : [];
}
export function isObjectWithRequiredKeys<T extends string>(
  object: unknown,
  requiredFields: T[],
): object is Record<T, unknown> {
  if (typeof object !== 'object' || object === null) {
    return false;
  }

  for (const field of requiredFields) {
    if (!(field in object)) {
      return false;
    }
  }

  return true;
}
export function isValidIP(ip: string | null | undefined): boolean {
  if (!ip) return false;
  const ipv4Regex =
    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){2}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  const ipv6Regex = /^([0-9a-fA-F]{1,4}:){7}([0-9a-fA-F]{1,4}|:)$/i;

  return ipv4Regex.test(ip) || ipv6Regex.test(ip);
}

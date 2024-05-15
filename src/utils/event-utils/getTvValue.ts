export default function getTvValue(
  event: TVEvent,
  fieldOrPath: string | string[] | null | undefined,
  defaultValue?: string | string[] | number | null | undefined,
): string | string[] | number | null | undefined {
  if (!event) return defaultValue;
  if (!fieldOrPath) return defaultValue;

  const paths = Array.isArray(fieldOrPath) ? fieldOrPath : [fieldOrPath];

  for (const path of paths) {
    // CHECK IN TV top level fields
    let value = _getObjectValue(event, path);
    if (value !== undefined) return value;

    // CHECK IN clientEvent
    const clientEvent = event.clientEvent;
    if (clientEvent) {
      value = _getObjectValue(clientEvent, path);
      if (value !== undefined) return value;
    }

    // CHECK IN last inputEvent
    const inputEvent = event.dispatchedEvents?.at(-1)?.inputEvent;
    if (inputEvent) {
      value = _getObjectValue(inputEvent, path);
      if (value !== undefined) return value;
    }
  }
  return defaultValue;
}
// Helper function to get value from object using path
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function _getObjectValue(obj: any, path: string) {
  const pathParts = path.split('.');
  let current = obj;

  for (const part of pathParts) {
    if (current === undefined) break;

    // looking for [index] or [-index] in the path
    // this indicates that we are looking for an array element
    const arrayMatch = part.match(/^(.+?)\[(\-?\d+)\]$/);
    if (arrayMatch) {
      const key = arrayMatch[1];
      const index = parseInt(arrayMatch[2], 10);
      current = current[key]?.at(index);
    }

    // direct lookup
    else {
      current = current[part];
    }
  }

  return current;
}

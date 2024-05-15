import _ from 'lodash';

export default function getTvValue(
  event: TVEvent,
  fieldOrPath: string | string[] | null | undefined,
  defaultValue?: string | string[] | number | null | undefined,
): string | string[] | number | null | undefined {
  if (!event) return defaultValue;
  if (!fieldOrPath) return defaultValue;

  const paths = Array.isArray(fieldOrPath) ? fieldOrPath : [fieldOrPath];

  const getValue = (obj: any, path: string) => {
    const pathParts = path.split('.');
    let current = obj;

    for (const part of pathParts) {
      if (current === undefined) break;

      const arrayMatch = part.match(/^(.+?)\[(\-?\d+)\]$/);
      if (arrayMatch) {
        const key = arrayMatch[1];
        const index = parseInt(arrayMatch[2], 10);
        current = current[key]?.at(index);
      } else {
        current = current[part];
      }
    }

    return current;
  };

  for (const path of paths) {
    // CHECK IN TV top level fields
    let value = getValue(event, path);
    if (value !== undefined) return value;

    // CHECK IN clientEvent
    const clientEvent = event.clientEvent;
    if (clientEvent) {
      value = getValue(clientEvent, path);
      if (value !== undefined) return value;
    }

    // CHECK IN last inputEvent
    const inputEvent = event.dispatchedEvents?.at(-1)?.inputEvent;
    if (inputEvent) {
      value = getValue(inputEvent, path);
      if (value !== undefined) return value;
    }
  }
  return defaultValue;
}

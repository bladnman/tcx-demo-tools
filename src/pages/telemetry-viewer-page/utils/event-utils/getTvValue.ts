import _ from 'lodash';

export default function getTvValue(
  event: TVEvent,
  fieldOrPath: string | string[] | null | undefined,
): string | string[] | number | null | undefined {
  if (!event) return undefined;
  if (!fieldOrPath) return undefined;

  const paths = Array.isArray(fieldOrPath) ? fieldOrPath : [fieldOrPath];

  for (const path of paths) {
    // CHECK IN TV top level fields
    let value = _.get(event, path, undefined);
    if (value !== undefined) return value;

    // CHECK IN clientEvent
    const clientEvent = event.clientEvent;
    if (clientEvent) {
      value = _.get(event.clientEvent, path, undefined);
      if (value !== undefined) return value;
    }

    // CHECK IN last inputEvent
    const inputEvent = event.dispatchedEvents?.at(-1)?.inputEvent;
    if (inputEvent) {
      value = _.get(inputEvent, path, undefined);
      if (value !== undefined) return value;
    }
  }
  return undefined;
}

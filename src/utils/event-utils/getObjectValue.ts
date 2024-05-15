// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function getObjectValue(obj: any, path: string, defaultValue?: any) {
  if (!path || path === '') return defaultValue;
  const pathParts = path.split('.');
  let current = obj;

  for (const part of pathParts) {
    if (!path || path === '') continue;
    if (current === undefined) break;

    // looking for path[index] or path[-index] in the path
    // this indicates that we are looking for a
    // specific array element
    const arrayWithIndexMatch = part.match(/^(.+?)\[(-?\d+)]$/);
    if (arrayWithIndexMatch) {
      const key = arrayWithIndexMatch[1];
      const index = parseInt(arrayWithIndexMatch[2], 10);
      current = current[key]?.at(index);
    }

    // direct lookup
    else {
      current = current[part];
    }
  }

  return current ?? defaultValue;
}

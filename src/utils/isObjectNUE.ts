/**
 * Check if the object is null or undefined
 */
export default function isObjectNUE(object: unknown): boolean {
  return (
    object === null ||
    object === undefined ||
    typeof object !== 'object' ||
    Object.keys(object).length === 0
  );
}

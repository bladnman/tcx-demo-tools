/**
 * Check if the object is null or undefined
 */
export default function isNU(object: unknown): boolean {
  return object === null || object === undefined;
}

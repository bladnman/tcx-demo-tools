import _ from 'lodash';

export function patchForLastArray<T>(path: string, object: T): string {
  // no [-1] in path
  if (!path.includes('[-1]')) return path;

  // do the heavy lifting of finding the last index
  // of the array being referenced
  return path
    .split('.')
    .map((segment) => {
      // Check if a segment ends with '[-1]', indicating the last element of an array
      if (segment.endsWith('[-1]')) {
        const arrayPath = segment.slice(0, -4); // Remove '[-1]' to get the array path
        const possibleArray = _.get(object, arrayPath, []); // Attempt to retrieve the array
        // If the array is valid, replace '[-1]' with the actual last index
        if (Array.isArray(possibleArray) && possibleArray.length > 0) {
          // Construct new path with last index
          return `${arrayPath}[${possibleArray.length - 1}]`;
        }
      }
      return segment;
    })
    .join('.');
}
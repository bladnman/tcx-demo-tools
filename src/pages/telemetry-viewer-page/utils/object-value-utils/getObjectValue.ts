import _ from 'lodash';

export default function getObjectValue<T>(
  object: T,
  paths: string[],
): string | number | null | undefined {
  for (const originalPath of getPatchedPaths(paths)) {
    // Identify paths with the '[-1]' notation and process them
    const processedPath = originalPath
      .split('.')
      .map((segment) => {
        // Check if a segment ends with '[-1]', indicating the last element of an array
        if (segment.endsWith('[-1]')) {
          const arrayPath = segment.slice(0, -4); // Remove '[-1]' to get the array path
          const array = _.get(object, arrayPath, []); // Attempt to retrieve the array
          // If the array is valid, replace '[-1]' with the actual last index
          if (Array.isArray(array) && array.length > 0) {
            const lastIndex = array.length - 1;
            return `${arrayPath}[${lastIndex}]`; // Construct new path with last index
          }
        }
        return segment;
      })
      .join('.');

    // Using the processed path to access the desired value
    const result = _.get(object, processedPath, Symbol.for('notFound'));

    // Return the result if it's not equal to the 'notFound' symbol
    if (result !== Symbol.for('notFound')) {
      return result as string | number | null | undefined;
    }
  }
  return null;
}
function getPatchedPaths(paths: string[]): string[] {
  const patchedPaths: string[] = [];
  const pubEventPatches = ['clientEvent', 'dispatchedEvents[-1].inputEvent'];

  for (const path of paths) {
    // SPREAD OUT PUB_EVENT PATHS
    if (path.includes('PUB_EVENT')) {
      for (const pubEventPatch of pubEventPatches) {
        patchedPaths.push(path.replace('PUB_EVENT', pubEventPatch));
      }
    }

    // JUST KEEP THE ORIGINAL PATH
    else {
      patchedPaths.push(path);
    }
  }
  return patchedPaths;
}

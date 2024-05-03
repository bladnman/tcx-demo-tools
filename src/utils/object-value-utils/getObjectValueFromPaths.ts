import _ from 'lodash';
import { patchForLastArray } from '@utils//object-value-utils/patchForLastArray.ts';
import { getPatchedPaths } from '@utils//object-value-utils/getPatchedPaths.ts';

export default function getObjectValueFromPaths<T>(
  object: T,
  paths: string[] | null | undefined,
): string | number | null | undefined {
  if (!paths) return null;

  // let's add common locations to paths
  const patchedPaths = getPatchedPaths(paths);

  for (const patchedPath of patchedPaths) {
    const processedPath = patchForLastArray(patchedPath, object);

    // Using the processed path to access the desired value
    const result = _.get(object, processedPath, Symbol.for('notFound'));

    // Return the result if it's not equal to the 'notFound' symbol
    if (result !== Symbol.for('notFound')) {
      return result as string | number | null | undefined;
    }
  }
  return null;
}

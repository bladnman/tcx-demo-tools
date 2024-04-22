import _ from 'lodash';
import { patchForLastArray } from '@pages/telemetry-viewer-page/utils/object-value-utils/patchForLastArray.ts';
import { getPatchedPaths } from '@pages/telemetry-viewer-page/utils/object-value-utils/getPatchedPaths.ts';

export default function getObjectValueFromFieldDef<T>(
  object: T,
  fieldDef: FieldDefinition,
): string | number | null | undefined {
  // patch the path definition
  if (!fieldDef._patchedPaths) {
    fieldDef._patchedPaths = getPatchedPaths(fieldDef.paths);
  }

  if (!fieldDef._patchedPaths) return null;

  for (const patchedPath of fieldDef._patchedPaths) {
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

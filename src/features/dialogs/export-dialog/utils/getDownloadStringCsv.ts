import TWEvent from '@classes/data/TWEvent';
import { Parser } from '@json2csv/plainjs';

export default function getDownloadStringCsv(
  events: TWEvent[],
  structure: 'twiz' | 'raw',
): string {
  const includeTwHeaders = structure === 'twiz';
  const uniqueKeys = getUniqueKeys(events, includeTwHeaders);
  const flatData = flattenData(events, uniqueKeys, includeTwHeaders);
  try {
    const parser = new Parser({ fields: uniqueKeys });
    const csv = parser.parse(flatData);
    // console.log(csv);
    return csv;
  } catch (err) {
    console.error(err);
    return '';
  }
}
function getUniqueKeys(data: TWEvent[], includeTwHeaders: boolean): string[] {
  const keysSet: Set<string> = new Set();

  data.forEach((entry) => {
    if (includeTwHeaders) {
      // TWEvent top-level keys
      Object.keys(entry).forEach((key) => {
        // just don't include the rawEvent key
        if (key !== 'rawEvent') {
          keysSet.add(key);
        }
      });
    }

    // rawEvent keys
    if (entry.rawEvent && typeof entry.rawEvent === 'object') {
      Object.keys(entry.rawEvent).forEach((key) => {
        // keysSet.add(includeTwHeaders ? `rawEvent_${key}` : key);
        keysSet.add(key);
      });
    }
  });

  // Filter out keys that start with an underscore
  return Array.from(keysSet).filter((key) => key.indexOf('_') !== 0);
}
function flattenData(data: TWEvent[], uniqueKeys: string[], includeTwHeaders: boolean) {
  return data.map((entry) => {
    const { rawEvent, ...topLevel } = entry;
    const flattenedRawEvent = flattenObject(rawEvent, '', {}, true);
    const flattenedEntry = includeTwHeaders
      ? ({
          ...topLevel,
          ...flattenedRawEvent,
          twReceiptTimesMs: topLevel.twReceiptTimesMs.join(', '),
          twTags: topLevel.twTags?.join(', ') ?? '',
        } as Hash)
      : (flattenedRawEvent as Hash);

    // Ensure all keys are present
    uniqueKeys.forEach((key) => {
      if (!(key in flattenedEntry)) {
        flattenedEntry[key] = '';
      }
    });

    return flattenedEntry;
  });
}
function flattenObject(
  obj: unknown,
  parentKey = '',
  result: Record<string, string> = {},
  preserveNestedObjects = false,
): Record<string, string> {
  // Type guard to ensure obj is of type Record<string, unknown>
  if (typeof obj === 'object' && obj !== null) {
    for (const key in obj as Record<string, unknown>) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const value = (obj as Record<string, unknown>)[key];
        const propName = parentKey ? `${parentKey}_${key}` : key;

        if (Array.isArray(value)) {
          result[propName] = value
            .map((item) =>
              typeof item === 'object' ? JSON.stringify(item) : String(item),
            )
            .join(', ');
        } else if (typeof value === 'object' && value !== null) {
          if (preserveNestedObjects) {
            result[propName] = JSON.stringify(value);
          } else {
            flattenObject(value, propName, result, preserveNestedObjects);
          }
        } else {
          result[propName] = String(value);
        }
      }
    }
  }
  return result;
}

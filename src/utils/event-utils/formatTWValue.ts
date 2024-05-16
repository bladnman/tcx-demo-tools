import TWEvent from '@classes/data/TWEvent.ts';

type Formatter = (value: unknown) => string;

interface FormatValueItem {
  path: string | string[];
  formatter?: Formatter;
}

export function formatTWValueList(
  event: TWEvent,
  configs: FormatValueItem[],
  separator = ' |:| ',
): string | undefined {
  const values = configs
    .map((item) => formatTWValue(event, item))
    .filter((value) => value !== undefined);
  if (values.length === 0) return undefined;

  return values.join(separator);
}

export function formatTWValue(
  event: TWEvent,
  config: FormatValueItem,
): string | number | null | undefined {
  if (!event) return undefined;
  if (!config) return undefined;
  if (!config.path) return undefined;

  const value = event.getStr(config.path);
  if (value === undefined) return undefined;
  return config.formatter ? config.formatter(value) : value;
}

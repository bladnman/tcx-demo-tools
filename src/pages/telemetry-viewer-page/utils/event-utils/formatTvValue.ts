import getTvValue from '@pages/telemetry-viewer-page/utils/event-utils/getTvValue.ts';

type Formatter = (value: unknown) => string;

interface FormatValueItem {
  path: string | string[];
  formatter?: Formatter;
}

export function formatTvValueList(
  event: TVEvent,
  configs: FormatValueItem[],
  separator = ' |:| ',
): string | undefined {
  const values = configs
    .map((item) => formatTvValue(event, item))
    .filter((value) => value !== undefined);
  if (values.length === 0) return undefined;

  return values.join(separator);
}

export function formatTvValue(
  event: TVEvent,
  config: FormatValueItem,
): string | number | null | undefined {
  if (!event) return undefined;
  if (!config) return undefined;
  if (!config.path) return undefined;

  const value = getTvValue(event, config.path);
  if (value === undefined) return undefined;
  return config.formatter ? config.formatter(value) : value;
}

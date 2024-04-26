import getTvValue from '@pages/telemetry-viewer-page/utils/event-utils/getTvValue.ts';

type TraceSpanTag = { key: string; value: string };
export type TraceSpanTagStruct = {
  originator?: string;
  url?: string;
  urlShort?: string;
  status_code?: number;
  method?: string;
  platform?: string;
  error?: string;
  errorMessage?: string;
  flow?: string;
};
export default function getTraceSpanTagStruct(event: TVEvent): TraceSpanTagStruct | null {
  const type = getTvValue(event, 'type');
  const tags = getTvValue(event, 'tags');

  if (type !== 'TraceSpan') return null;
  if (!Array.isArray(tags)) return null;

  const traceTags = tags as unknown as TraceSpanTag[];
  const struct: TraceSpanTagStruct = {};
  traceTags.forEach((tag) => {
    const key = tag.key;
    const value = String(tag.value);
    if (key === 'originator') {
      struct.originator = value;
    } else if (key === 'http.url') {
      struct.url = value;
      struct.urlShort = summarizeUrl(value);
    } else if (key === 'http.status_code') {
      struct.status_code = Number(value);
    } else if (key === 'http.method') {
      struct.method = value;
    } else if (key === 'psn.platform') {
      struct.platform = value;
    } else if (key === 'error') {
      struct.error = value;
    } else if (key === 'error.msg') {
      struct.errorMessage = value;
    } else if (key === 'flow') {
      struct.flow = value;
    }
  });
  return struct;
}
function summarizeUrl(url: string) {
  if (!url || !url.includes('/api/')) return '';

  // let's return everything after the first `/api/` segment

  return url.split('/api/').slice(1).join('').replace(/\//g, ' / ');
}

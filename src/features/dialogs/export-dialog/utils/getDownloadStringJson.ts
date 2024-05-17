import TWEvent from '@classes/data/TWEvent.ts';

export default function getDownloadStringJson(
  events: TWEvent[],
  structure: 'twiz' | 'raw',
) {
  if (structure === 'twiz') {
    return JSON.stringify(events);
  } else {
    return JSON.stringify(events.map((event) => event.rawEvent));
  }
}

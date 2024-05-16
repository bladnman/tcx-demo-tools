import TWEvent from '@classes/data/TWEvent.ts';

export default function updateTWWithNewTW(previousEvent: TWEvent, newEvent: TWEvent) {
  if (!newEvent) return;

  previousEvent.rawEvent = newEvent.rawEvent;

  _spreadNewObjectData(previousEvent, newEvent, 'payloads');
  _spreadNewObjectData(previousEvent, newEvent, 'failures');
  _spreadNewObjectData(previousEvent, newEvent, 'filtered');

  _spreadNewArrayData(previousEvent, newEvent, 'tvTags');
  _spreadNewArrayData(previousEvent, newEvent, 'twReceiptTimesMs');
}

// Helper function to spread new data into the previous event
function _spreadNewObjectData(previousEvent: Hash, newEvent: Hash, field: string) {
  if (newEvent[field]) {
    previousEvent[field] = {
      ...(previousEvent[field] ?? {}),
      ...newEvent[field],
    };
  }
}
function _spreadNewArrayData(previousEvent: Hash, newEvent: Hash, field: string) {
  if (newEvent[field]) {
    previousEvent[field] = [...(previousEvent[field] ?? []), ...newEvent[field]];
  }
}

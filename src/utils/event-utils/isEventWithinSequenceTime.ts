import TWEvent from '@classes/data/TWEvent.ts';

export default function isEventWithinSequenceTime(
  event: TWEvent,
  sequence: Sequence,
): boolean {
  if (!event) return false;
  if (!sequence) return false;

  const passedStartCheck = event.twEventTimeMs >= sequence.beginMs;
  const passedEndCheck = !sequence.endMs ? true : event.twEventTimeMs <= sequence.endMs;
  return passedStartCheck && passedEndCheck;
}

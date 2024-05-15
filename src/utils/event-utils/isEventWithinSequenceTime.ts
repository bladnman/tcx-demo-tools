export default function isEventWithinSequenceTime(
  event: TVEvent,
  sequence: Sequence,
): boolean {
  if (!event) return false;
  if (!sequence) return false;

  const passedStartCheck = event.timeMs >= sequence.beginMs;
  const passedEndCheck = !sequence.endMs ? true : event.timeMs <= sequence.endMs;
  return passedStartCheck && passedEndCheck;
}

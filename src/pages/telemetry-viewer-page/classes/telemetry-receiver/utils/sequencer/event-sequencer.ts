import getSequenceEngines from '@pages/telemetry-viewer-page/classes/telemetry-receiver/utils/sequencer/getSequenceEngines.ts';

export default function eventSequencer(
  events: TVEvent[],
  sequences: Sequences,
): Sequences {
  let isDirty = false;
  getSequenceEngines().forEach((engine) => {
    const originalSequenceList = sequences[engine.sequenceKey] ?? [];
    const processedSequenceList = engine.processEvents(
      events,
      sequences[engine.sequenceKey] ?? [],
    );

    // CHANGES
    if (originalSequenceList !== processedSequenceList) {
      isDirty = true;
      sequences[engine.sequenceKey] = processedSequenceList;
    }
  });

  // CHANGES
  if (isDirty) return { ...sequences };

  // NO CHANGES
  return sequences;
}

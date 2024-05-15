import SEQUENCER_DEFS from '@classes/sequencers/SEQUENCER_DEFS.ts';

export default function eventSequencer(
  events: TVEvent[],
  sequences: Sequences,
): Sequences {
  let isDirty = false;

  SEQUENCER_DEFS.forEach((sequencerDef) => {
    const engine = sequencerDef.engine;
    const originalSequenceList = sequences[engine.sequenceType] ?? [];
    const processedSequenceList = engine.processEvents(
      events,
      sequences[engine.sequenceType] ?? [],
    );

    // CHANGES
    if (originalSequenceList !== processedSequenceList) {
      isDirty = true;
      sequences[engine.sequenceType] = processedSequenceList;
    }
  });

  // CHANGES
  if (isDirty) return { ...sequences };

  // NO CHANGES
  return sequences;
}

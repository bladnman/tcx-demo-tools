import AppInstanceSequencerEngine from '../../../sequencers/engines/AppInstanceSequencerEngine.ts';
import SequencerEngineBase from '../../../sequencers/SequencerEngineBase.ts';

export default function getSequenceEngines(): SequencerEngineBase[] {
  return [AppInstanceSequencerEngine.getInstance()];
}

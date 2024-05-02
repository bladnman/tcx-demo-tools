import AppInstanceSequencerEngine from '@pages/telemetry-viewer-page/classes/sequencers/engines/AppInstanceSequencerEngine.ts';
import SequencerEngineBase from '@pages/telemetry-viewer-page/classes/sequencers/SequencerEngineBase.ts';

export default function getSequenceEngines(): SequencerEngineBase[] {
  return [AppInstanceSequencerEngine.getInstance()];
}

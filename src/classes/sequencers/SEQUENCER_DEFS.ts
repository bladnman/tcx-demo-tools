import AppInstanceSequencerEngine from '@classes/sequencers/engines/app-instance/AppInstanceSequencerEngine.ts';
import PurchaseFlowSequencerEngine from '@classes/sequencers/engines/PurchaseFlowSequencerEngine.ts';
import SequencerEngineBase from '@classes/sequencers/SequencerEngineBase.ts';
import SeqTileAppInstance from '@pages/sequences/features/sequences-lists/sequence-tiles/SeqTileAppInstance.tsx';
import SeqTileDefault from '@pages/sequences/features/sequences-lists/sequence-tiles/SeqTileDefault.tsx';
import { FC } from 'react';

export type SequencerListComponentProps = {
  engine: SequencerEngineBase;
  title: string;
};
export type SequencerItemComponentProps = {
  sequence: Sequence;
};
export type SequencerDef = {
  title: string;
  engine: SequencerEngineBase;
  ItemComponent?: FC<SequenceTileProps>;
};
const SEQUENCER_DEFS: SequencerDef[] = [
  {
    title: 'App Instances',
    engine: AppInstanceSequencerEngine.getInstance(),
    ItemComponent: SeqTileAppInstance,
  },
  {
    title: 'Purchase Flows',
    engine: PurchaseFlowSequencerEngine.getInstance(),
    ItemComponent: SeqTileDefault,
  },
];

export default SEQUENCER_DEFS;

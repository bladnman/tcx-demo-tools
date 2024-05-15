import { SequencerDef } from '@classes/sequencers/SEQUENCER_DEFS.ts';
import CollapsibleContainer from '@common/CollapsableContainer.tsx';
import { VStack } from '@common/mui-stacks.tsx';
import { Typography } from '@mui/material';
import BaseSequenceTile from '@pages/sequences/features/sequences-lists/base-sequence-tile/BaseSequenceTile.tsx';
import SelectionMenuItem from '@features/sidebar-panel/features/SelectionMenuItem.tsx';
import actionSetSelectedSequence from '@store/settings-store/actions/actionSetSelectedSequence.ts';
import useSequenceList from '@store/settings-store/hooks/useSequenceList.ts';
import useSettingsStore from '@store/settings-store/useSettingsStore.ts';

export default function SequenceGroup({ sequencerDef }: { sequencerDef: SequencerDef }) {
  const selectedSequence = useSettingsStore((state) => state.selectedSequence);
  const { engine, title, ItemComponent } = sequencerDef;
  const sequences = useSequenceList(engine.sequenceType);
  const indentation = '2em';
  const renderTitle = () => {
    return (
      <Typography fontFamily={'anton'} fontSize={'0.8em'} fontWeight={'bold'}>
        {title}
      </Typography>
    );
  };
  const renderCollapsed = () => {
    const selectedSequences = sequences.filter((s) => s.id === selectedSequence?.id);
    if (!selectedSequences.length) return null;
    return renderItems(selectedSequences);
  };
  const renderExpanded = () => {
    return renderItems(sequences);
  };
  const renderItems = (sequences: Sequence[]) => {
    return (
      <VStack topLeft hFill spacing={0} sx={{ pl: indentation, paddingBottom: '1em' }}>
        {sequences.map((sequence) => {
          if (!ItemComponent) return null;
          const isSelected = selectedSequence?.id === sequence.id;
          return (
            <SelectionMenuItem
              key={`${sequence.id}`}
              title={sequence.engine.appName as string}
              active={isSelected}
              showRadioButton={false}
              onClick={() => {
                actionSetSelectedSequence(isSelected ? null : sequence);
              }}
            >
              <BaseSequenceTile sequence={sequence} isSelected={isSelected}>
                <ItemComponent
                  sequence={sequence}
                  key={sequence.id}
                  isSelected={isSelected}
                />
              </BaseSequenceTile>
            </SelectionMenuItem>
          );
        })}
      </VStack>
    );
  };

  return (
    <CollapsibleContainer
      title={renderTitle()}
      collapsed={true}
      sx={{ width: '100%' }}
      collapsedChildren={renderCollapsed()}
    >
      <VStack topLeft hFill spacing={0}>
        {renderExpanded()}
      </VStack>
    </CollapsibleContainer>
  );
}

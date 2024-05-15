import SEQUENCER_DEFS from '@classes/sequencers/SEQUENCER_DEFS.ts';
import { VStack } from '@common/mui-stacks.tsx';
import CONST from '@const/CONST.ts';
import useScrollAwareness from '@hooks/useScrollAwareness.ts';
import SequenceGroup from '@pages/sequences/features/left-drawer/SequenceGroup.tsx';
import MenuContainer from '@features/sidebar-panel/features/MenuContainer.tsx';
import { useRef } from 'react';

export default function SequencesLeftDrawer() {
  const vStackRef = useRef(null);
  const isScrolled = useScrollAwareness(vStackRef);
  return (
    <VStack topLeft fill>
      <VStack
        hFill
        spacing={0}
        sx={{
          height: 10,
          flexShrink: 0,
          boxShadow: isScrolled ? CONST.SCROLL_DROP_BOX_SHADOW : 'none',
        }}
      />

      <VStack
        fill
        topLeft
        spacing={0}
        ref={vStackRef}
        sx={{
          px: 2,
          pt: 0,
          flexShrink: 0,
          overflow: 'auto',
        }}
      >
        <MenuContainer title={'Sequences'} sx={{ px: 0 }}>
          {SEQUENCER_DEFS.map((sequencerDef) => {
            if (!sequencerDef.ItemComponent) return null;
            return (
              <SequenceGroup
                sequencerDef={sequencerDef}
                key={sequencerDef.engine.sequenceType}
              />
            );
          })}
        </MenuContainer>
      </VStack>
    </VStack>
  );
}

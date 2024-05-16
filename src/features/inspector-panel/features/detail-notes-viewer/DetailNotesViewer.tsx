import TWEvent from '@classes/data/TWEvent.ts';
import { VStack } from '@common/mui-stacks.tsx';
import DetailsErrorViewer from '@features/inspector-panel/features/detail-notes-viewer/features/DetailsErrorViewer.tsx';

export default function DetailNotesViewer({ event }: { event: TWEvent }) {
  return (
    <VStack hFill left spacing={1}>
      <DetailsErrorViewer event={event} />
    </VStack>
  );
}

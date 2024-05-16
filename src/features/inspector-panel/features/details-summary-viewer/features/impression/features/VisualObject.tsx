import TWEvent from '@classes/data/TWEvent.ts';
import ActionCard from '@features/inspector-panel/features/details-summary-viewer/features/impression/features/ActionCard.tsx';
import Tile from '@features/inspector-panel/features/details-summary-viewer/features/impression/features/Tile.tsx';

export default function VisualObject({ event }: { event: TWEvent }) {
  const actionCardType = event.getStr('actionCardType');
  const tilePosition = event.getStr('tilePosition');
  const tileContent = event.getStr('tileContent');

  if (actionCardType !== undefined) return <ActionCard event={event} />;
  if (tilePosition !== undefined || !!tileContent) return <Tile event={event} />;

  return null;
}

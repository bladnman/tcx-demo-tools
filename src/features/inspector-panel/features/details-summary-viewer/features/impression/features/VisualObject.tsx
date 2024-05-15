import ActionCard from '@features/inspector-panel/features/details-summary-viewer/features/impression/features/ActionCard.tsx';
import Tile from '@features/inspector-panel/features/details-summary-viewer/features/impression/features/Tile.tsx';
import getTvValue from '@utils/event-utils/getTvValue.ts';

export default function VisualObject({ event }: { event: TVEvent }) {
  const actionCardType = getTvValue(event, 'actionCardType');
  const tilePosition = getTvValue(event, 'tilePosition');
  const tileContent = getTvValue(event, 'tileContent');

  if (actionCardType !== undefined) return <ActionCard event={event} />;
  if (tilePosition !== undefined || !!tileContent) return <Tile event={event} />;

  return null;
}

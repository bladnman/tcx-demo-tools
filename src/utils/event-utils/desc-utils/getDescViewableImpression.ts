import TWEvent from '@classes/data/TWEvent.ts';
import FIELD_DEF from '@const/FIELD_DEF.ts';
import { formatTWValueList } from '@utils/event-utils/formatTWValue.ts';

export default function getDescViewableImpression(event: TWEvent) {
  const highlight = event.getStr(FIELD_DEF.visualEntityType.paths);

  const message = formatTWValueList(event, [
    {
      path: FIELD_DEF.interactCta.paths,
    },
    {
      path: 'strandName',
      formatter: (value) => `Strand: ${value}`,
    },
    {
      path: FIELD_DEF.tilePosition.paths,
      formatter: (value) => `Tile: ${value}`,
    },
  ]);

  return {
    highlight,
    message,
    color: `fg.main`,
  };
}

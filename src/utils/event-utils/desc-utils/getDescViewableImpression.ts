import FIELD_DEF from '@const/FIELD_DEF.ts';
import getTvValue from '@utils//event-utils/getTvValue.ts';
import { formatTvValueList } from '@utils//event-utils/formatTvValue.ts';

export default function getDescViewableImpression(event: TVEvent) {
  const highlight = getTvValue(event, FIELD_DEF.visualEntityType.paths);

  const message = formatTvValueList(event, [
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

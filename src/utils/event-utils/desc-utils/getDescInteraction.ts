import FIELD_DEF from '@const/FIELD_DEF.ts';
import getTvValue from '@utils//event-utils/getTvValue.ts';

export default function getDescInteraction(event: TVEvent) {
  const highlight = getTvValue(event, FIELD_DEF.interactAction.paths);
  const message = getTvValue(event, FIELD_DEF.interactCta.paths);

  return {
    highlight,
    message,
    color: `fg.main`,
  };
}

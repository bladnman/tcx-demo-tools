import TWEvent from '@classes/data/TWEvent.ts';
import FIELD_DEF from '@const/FIELD_DEF.ts';

export default function getDescInteraction(event: TWEvent) {
  const highlight = event.getStr(FIELD_DEF.interactAction.paths);
  const message = event.getStr(FIELD_DEF.interactCta.paths);

  return {
    highlight,
    message,
    color: `fg.main`,
  };
}

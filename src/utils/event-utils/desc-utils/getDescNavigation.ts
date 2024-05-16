import TWEvent from '@classes/data/TWEvent.ts';
import FIELD_DEF from '@const/FIELD_DEF.ts';
import { formatTWValueList } from '@utils/event-utils/formatTWValue.ts';
import { getEventDef } from '@utils//event-utils/getEventDef.ts';
import { getSimpleSceneName } from '@utils//telemetry-utils.ts';

export default function getDescNavigation(event: TWEvent) {
  const eventDef = getEventDef(event);
  const highlight = formatTWValueList(event, [
    {
      path: FIELD_DEF.locationScene.paths,
      formatter: (value) => {
        const thisValue = value as string;
        if (event.appName === 'game-hub' || thisValue.includes('game hub:')) {
          return getSimpleSceneName(thisValue);
        }
        return thisValue;
      },
    },
  ]);

  const message = event.getStr(FIELD_DEF.interactCta.paths);

  return {
    highlight,
    message,
    color: `${eventDef.color}.main`,
  };
}

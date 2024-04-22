import FIELD_DEF from '@pages/telemetry-viewer-page/constants/FIELD_DEF.ts';
import { getSimpleSceneName } from '@pages/telemetry-viewer-page/utils/telemetry-utils.ts';
import { getEventDef } from '@pages/telemetry-viewer-page/utils/event-utils/getEventDef.ts';
import { formatTvValueList } from '@pages/telemetry-viewer-page/utils/event-utils/formatTvValue.ts';
import getTvValue from '@pages/telemetry-viewer-page/utils/event-utils/getTvValue.ts';

export default function getDescNavigation(event: TVEvent) {
  const eventDef = getEventDef(event);
  const appName = getTvValue(event, FIELD_DEF.appName.paths);
  const highlight = formatTvValueList(event, [
    {
      path: FIELD_DEF.locationScene.paths,
      formatter: (value) => {
        const thisValue = value as string;
        if (appName === 'game-hub' || thisValue.includes('game hub:')) {
          return getSimpleSceneName(thisValue);
        }
        return thisValue;
      },
    },
  ]);

  const message = getTvValue(event, FIELD_DEF.interactCta.paths);

  return {
    highlight,
    message,
    color: `${eventDef.color}.main`,
  };
}

import { getEventDef } from '@utils//event-utils/getEventDef.ts';
import FIELD_DEF from '@const/FIELD_DEF.ts';
import formatMilliseconds from '@utils/formatMilliseconds.ts';
import getObjectValueFromFieldDef from '@utils//object-value-utils/getObjectValueFromFieldDef.ts';
import getTvValue from '@utils//event-utils/getTvValue.ts';

export default function getDescVideoStream(event: TVEvent) {
  const eventDef = getEventDef(event);

  let highlight = getObjectValueFromFieldDef(event, FIELD_DEF.videoEventType);
  if (highlight === 'Progress') {
    const videoProgressType = getObjectValueFromFieldDef(
      event,
      FIELD_DEF.videoProgressType,
    );
    const lastSentQuartile = getObjectValueFromFieldDef(
      event,
      FIELD_DEF.lastSentQuartile,
    );
    const quartile = videoProgressType ? videoProgressType : `Q${lastSentQuartile}`;
    highlight += ` - ${quartile}`;
  }

  const videoTitle =
    getObjectValueFromFieldDef(event, FIELD_DEF.videoTitle) ?? '(no title)';
  let elapsedTime = getObjectValueFromFieldDef(event, FIELD_DEF.elapsedTime) ?? 0;
  elapsedTime = formatMilliseconds((elapsedTime as number) * 1000);

  const videoEventType = getTvValue(event, FIELD_DEF.videoEventType.paths);
  let color = `${eventDef.color}.main`;
  switch (videoEventType) {
    case 'Start':
      color = 'appOrange.main';
      break;
      // case 'Complete':
      //   color = 'appGreen.main';
      break;
    case 'Error':
      color = 'appRed.main';
      break;
    case 'Play':
    case 'Seek':
    case 'Resume':
      color = 'fg.main';
      break;
    case 'Pause':
    case 'Progress':
      color = 'fg50.main';
      break;
    default:
      break;
  }

  return {
    highlight,
    message: `[${elapsedTime}] ${videoTitle}`,
    color,
  };
}

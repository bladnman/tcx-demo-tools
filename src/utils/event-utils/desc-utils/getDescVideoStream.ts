import TWEvent from '@classes/data/TWEvent.ts';
import FIELD_DEF from '@const/FIELD_DEF.ts';
import { getEventDef } from '@utils/event-utils/event-def/getEventDef.ts';
import formatMilliseconds from '@utils/formatMilliseconds.ts';

export default function getDescVideoStream(event: TWEvent) {
  const eventDef = getEventDef(event);

  let highlight = event.getStr(FIELD_DEF.videoEventType.paths);
  if (highlight === 'Progress') {
    const videoProgressType = event.getStr(FIELD_DEF.videoProgressType.paths);
    const lastSentQuartile = event.getStr(FIELD_DEF.lastSentQuartile.paths);
    const quartile = videoProgressType ? videoProgressType : `Q${lastSentQuartile}`;
    highlight += ` - ${quartile}`;
  }

  const videoTitle = event.getStr(FIELD_DEF.videoTitle.paths) ?? '(no title)';
  let elapsedTime = event.getStr(FIELD_DEF.elapsedTime.paths) ?? 0;
  elapsedTime = formatMilliseconds((elapsedTime as number) * 1000);

  const videoEventType = event.getStr(FIELD_DEF.videoEventType.paths);
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

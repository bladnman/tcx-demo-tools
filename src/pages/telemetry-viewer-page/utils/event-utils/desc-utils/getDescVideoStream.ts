import { getEventDef } from '@pages/telemetry-viewer-page/utils/event-utils/getEventDef.ts';
import getObjectValue from '@pages/telemetry-viewer-page/utils/getObjectValue.ts';
import FIELD_DEF from '@pages/telemetry-viewer-page/constants/FIELD_DEF.ts';
import formatMilliseconds from '@utils/formatMilliseconds.ts';

export default function getDescVideoStream(event: TVEvent) {
  const eventDef = getEventDef(event);

  let highlight = getObjectValue(event, FIELD_DEF.videoEventType.paths);
  if (highlight === 'Progress') {
    const videoProgressType = getObjectValue(
      event,
      FIELD_DEF.videoProgressType.paths,
    );
    const lastSentQuartile = getObjectValue(
      event,
      FIELD_DEF.lastSentQuartile.paths,
    );
    const quartile = videoProgressType
      ? videoProgressType
      : `Q${lastSentQuartile}`;
    highlight += ` - ${quartile}`;
  }

  const videoTitle =
    getObjectValue(event, FIELD_DEF.videoTitle.paths) ?? '(no title)';
  let elapsedTime = getObjectValue(event, FIELD_DEF.elapsedTime.paths) ?? 0;
  elapsedTime = formatMilliseconds((elapsedTime as number) * 1000);

  return {
    highlight,
    message: `[${elapsedTime}] ${videoTitle}`,
    color: `${eventDef.color}.main`,
  };
}

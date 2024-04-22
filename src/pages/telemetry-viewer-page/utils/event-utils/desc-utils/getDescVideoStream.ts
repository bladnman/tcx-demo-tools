import { getEventDef } from '@pages/telemetry-viewer-page/utils/event-utils/getEventDef.ts';
import FIELD_DEF from '@pages/telemetry-viewer-page/constants/FIELD_DEF.ts';
import formatMilliseconds from '@utils/formatMilliseconds.ts';
import getObjectValueFromFieldDef from '@pages/telemetry-viewer-page/utils/object-value-utils/getObjectValueFromFieldDef.ts';

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

  return {
    highlight,
    message: `[${elapsedTime}] ${videoTitle}`,
    color: `${eventDef.color}.main`,
  };
}

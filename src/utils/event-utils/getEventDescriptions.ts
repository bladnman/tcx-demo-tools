import { getEventDef } from '@utils//event-utils/getEventDef.ts';
import getDescVideoStream from '@utils//event-utils/desc-utils/getDescVideoStream.ts';
import getDescViewableImpression from '@utils//event-utils/desc-utils/getDescViewableImpression.ts';
import getDescInteraction from '@utils//event-utils/desc-utils/getDescInteraction.ts';
import getDescNavigation from '@utils//event-utils/desc-utils/getDescNavigation.ts';
import getDescError from '@utils//event-utils/desc-utils/getDescError.ts';
import getDescStartup from '@utils//event-utils/desc-utils/getDescStartup.ts';
import getDescLoadTime from '@utils//event-utils/desc-utils/getDescLoadTime.ts';
import { EVENT_TYPE_DEF } from '@const/EVENT_TYPE.ts';
import FIELD_DEF from '@const/FIELD_DEF.ts';
import getObjectValueFromFieldDef from '@utils//object-value-utils/getObjectValueFromFieldDef.ts';
import getTvValue from '@utils//event-utils/getTvValue.ts';
import formatSeconds from '@utils/formatSeconds.ts';

export default function getEventDescriptions(event: TVEvent) {
  const eventDef = getEventDef(event);

  let message, highlight, color;

  switch (eventDef) {
    case EVENT_TYPE_DEF.ViewableImpression:
      return getDescViewableImpression(event);
    case EVENT_TYPE_DEF.Interaction:
      return getDescInteraction(event);
    case EVENT_TYPE_DEF.Navigation:
      return getDescNavigation(event);
    case EVENT_TYPE_DEF.NetworkError:
    case EVENT_TYPE_DEF.ApplicationError:
      return getDescError(event);
    case EVENT_TYPE_DEF.Startup:
      return getDescStartup(event);
    case EVENT_TYPE_DEF.LoadTime:
      return getDescLoadTime(event);
    case EVENT_TYPE_DEF.VideoStream:
      const defaultMessage = getDescVideoStream(event);
      const videoEventType = getTvValue(event, 'videoEventType');
      if (videoEventType) {
        switch ((videoEventType as string).toLowerCase()) {
          case 'seek':
            const videoTimeDelta = getTvValue(event, 'videoTimeDelta') ?? 0;
            const videoSeekDirection = getTvValue(event, 'videoSeekDirection');
            const sign = videoSeekDirection === 'Forward' ? '+' : '-';
            defaultMessage.message = `(${sign}${formatSeconds(~~videoTimeDelta)}) ${defaultMessage.message}`;
            break;
        }
      }
      return defaultMessage;
    default:
      message = getObjectValueFromFieldDef(event, FIELD_DEF.type);
      color = 'fg.main';
      break;
  }

  return { highlight, message, color };
}

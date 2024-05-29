import TWEvent from '@classes/data/TWEvent.ts';
import { EVENT_TYPE_DEF } from '@const/EVENT_TYPE.ts';
import FIELD_DEF from '@const/FIELD_DEF.ts';
import getDescError from '@utils//event-utils/desc-utils/getDescError.ts';
import getDescInteraction from '@utils//event-utils/desc-utils/getDescInteraction.ts';
import getDescLoadTime from '@utils//event-utils/desc-utils/getDescLoadTime.ts';
import getDescNavigation from '@utils//event-utils/desc-utils/getDescNavigation.ts';
import getDescStartup from '@utils//event-utils/desc-utils/getDescStartup.ts';
import getDescVideoStream from '@utils//event-utils/desc-utils/getDescVideoStream.ts';
import getDescViewableImpression from '@utils//event-utils/desc-utils/getDescViewableImpression.ts';
import getDescTelemetryDropped from '@utils/event-utils/desc-utils/getDescTelemetryDropped.ts';
import { getEventDef } from '@utils/event-utils/event-def/getEventDef.ts';
import getDescErrorDialog from '@utils/event-utils/desc-utils/getDescErrorDialog.ts';
import formatSeconds from '@utils/formatSeconds.ts';

export default function getEventDescriptions(event: TWEvent) {
  const eventDef = getEventDef(event);

  let message, highlight, color;

  switch (eventDef.type) {
    case EVENT_TYPE_DEF.ViewableImpression!.type:
      return getDescViewableImpression(event);
    case EVENT_TYPE_DEF.Interaction!.type:
      return getDescInteraction(event);
    case EVENT_TYPE_DEF.Navigation!.type:
      return getDescNavigation(event);
    case EVENT_TYPE_DEF.NetworkError!.type:
    case EVENT_TYPE_DEF.ApplicationError!.type:
      return getDescError(event);
    case EVENT_TYPE_DEF.Startup!.type:
      return getDescStartup(event);
    case EVENT_TYPE_DEF.LoadTime!.type:
      return getDescLoadTime(event);
    case EVENT_TYPE_DEF.TelemetryDropped!.type:
      return getDescTelemetryDropped(event);
    case EVENT_TYPE_DEF.ErrorDialog!.type:
      return getDescErrorDialog(event);
    case EVENT_TYPE_DEF.VideoStream!.type:
      const defaultMessage = getDescVideoStream(event);
      const videoEventType = event.getStr('videoEventType');
      if (videoEventType) {
        switch ((videoEventType as string).toLowerCase()) {
          case 'seek':
            const videoTimeDelta = event.getStr('videoTimeDelta') ?? 0;
            const videoSeekDirection = event.getStr('videoSeekDirection');
            const sign = videoSeekDirection === 'Forward' ? '+' : '-';
            defaultMessage.message = `(${sign}${formatSeconds(~~videoTimeDelta)}) ${defaultMessage.message}`;
            break;
        }
      }
      return defaultMessage;
    default:
      message = event.getStr(FIELD_DEF.type.paths);
      color = 'fg.main';
      break;
  }

  return { highlight, message, color };
}

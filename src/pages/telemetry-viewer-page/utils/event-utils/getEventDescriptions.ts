import { getEventDef } from '@pages/telemetry-viewer-page/utils/event-utils/getEventDef.ts';
import getDescVideoStream from '@pages/telemetry-viewer-page/utils/event-utils/desc-utils/getDescVideoStream.ts';
import getDescViewableImpression from '@pages/telemetry-viewer-page/utils/event-utils/desc-utils/getDescViewableImpression.ts';
import getDescInteraction from '@pages/telemetry-viewer-page/utils/event-utils/desc-utils/getDescInteraction.ts';
import getDescNavigation from '@pages/telemetry-viewer-page/utils/event-utils/desc-utils/getDescNavigation.ts';
import getDescError from '@pages/telemetry-viewer-page/utils/event-utils/desc-utils/getDescError.ts';
import getDescStartup from '@pages/telemetry-viewer-page/utils/event-utils/desc-utils/getDescStartup.ts';
import getDescLoadTime from '@pages/telemetry-viewer-page/utils/event-utils/desc-utils/getDescLoadTime.ts';
import { EVENT_TYPE_DEF } from '@pages/telemetry-viewer-page/constants/EVENT_TYPE.ts';
import FIELD_DEF from '@pages/telemetry-viewer-page/constants/FIELD_DEF.ts';
import getObjectValueFromFieldDef from '@pages/telemetry-viewer-page/utils/object-value-utils/getObjectValueFromFieldDef.ts';

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
      return getDescVideoStream(event);
    default:
      message = getObjectValueFromFieldDef(event, FIELD_DEF.type);
      color = 'tokenDetailsFGBright.main';
      break;
  }

  return { highlight, message, color };
}

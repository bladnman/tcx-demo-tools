import { EVENT_TYPE_DEF } from '@pages/telemetry-viewer-page/constants/EVENT_TYPE.ts';
import { getSimpleSceneName } from '@pages/telemetry-viewer-page/utils/telemetry-utils.ts';
import DetailDisplay from '@pages/telemetry-viewer-page/common/telemetry-token/features/event-details/parts/DetailDisplay.tsx';
import { getEventDef } from '@pages/telemetry-viewer-page/utils/getEventDef.ts';
import { getLoadTimeDetails } from '@pages/telemetry-viewer-page/utils/getLoadTimeDetails.ts';
export default function EventDetails({
  event,
  colorMode = 'dual',
  displayMode = 'details',
}: {
  event: TVEvent;
  fontSize?: string;
  colorMode?: TokenColorMode;
  displayMode?: TokenMode;
}) {
  const eventDef = getEventDef(event);
  const includeColor = colorMode === 'dual';
  const includeMessage = displayMode === 'details';

  let highlight, message, color;
  color = `tokenDetailsFGWhite.main`;

  switch (eventDef) {
    case EVENT_TYPE_DEF.ViewableImpression:
      highlight = event?.clientEvent?.visualEntityType;
      message = event?.clientEvent?.interactCta;
      break;
    case EVENT_TYPE_DEF.Interaction:
      highlight = event?.clientEvent?.interactAction;
      message = event?.clientEvent?.interactCta;
      break;
    case EVENT_TYPE_DEF.Navigation:
      highlight = getSimpleSceneName(event?.clientEvent?.locationScene);
      message = 'location';
      color = 'tokenDetailsFGBlue.main';
      break;
    case EVENT_TYPE_DEF.NetworkError:
    case EVENT_TYPE_DEF.ApplicationError:
      highlight = event?.clientEvent?.severity;
      message = `${event?.clientEvent?.vshErrorHexCode} | ${event?.clientEvent?.errorMessage}`;
      if (event?.clientEvent?.severity === 'critical')
        color = 'tokenDetailsFGRed.main';
      if (event?.clientEvent?.severity === 'major')
        color = 'tokenDetailsFGRed.main';
      // if (event?.clientEvent?.severity === 'normal')
      //   // color = 'tokenDetailsFGOrange.main';
      break;
    case EVENT_TYPE_DEF.Startup:
      highlight = 'Vroom';
      // color = 'tokenDetailsFGRed.main';
      break;
    case EVENT_TYPE_DEF.LoadTime:
      const loadTimeData = getLoadTimeDetails(event);
      message = loadTimeData?.message;
      highlight = loadTimeData?.highlight;
      color = `${eventDef.color}.main`;
      if (message?.includes('timeToInteractive')) {
        color = 'tokenDetailsFGOrange.main';
      }
      break;
    default:
      // message = undefined;
      // highlight = event?.clientEvent?.type ?? event?.type;
      message = event?.clientEvent?.type ?? event?.type;
      highlight = undefined;
      color = 'tokenDetailsFG.main';
      break;
  }

  const finalMessage = includeMessage ? message : undefined;

  // bail - no highlight or message
  if (!highlight && !finalMessage) return null;

  return (
    <DetailDisplay
      highlight={highlight}
      message={finalMessage}
      color={includeColor ? color : undefined}
    />
  );
}

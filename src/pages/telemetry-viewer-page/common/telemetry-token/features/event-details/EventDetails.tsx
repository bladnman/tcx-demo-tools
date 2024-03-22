import { EVENT_TYPE_DEF } from '@pages/telemetry-viewer-page/constants/EVENT_TYPE.ts';
import {
  getEventDef,
  getSimpleSceneName,
} from '@pages/telemetry-viewer-page/utils/telemetry-utils.ts';
import formatMilliseconds from '@utils/formatMilliseconds.ts';
import DetailDisplay from '@pages/telemetry-viewer-page/common/telemetry-token/features/event-details/parts/DetailDisplay.tsx';
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

  switch (eventDef) {
    case EVENT_TYPE_DEF.ViewableImpression:
      highlight = event.tdEvent.clientEvent?.visualEntityType;
      message = event.tdEvent.clientEvent?.interactCta;
      break;
    case EVENT_TYPE_DEF.Interaction:
      highlight = event.tdEvent.clientEvent?.interactAction;
      message = event.tdEvent.clientEvent?.interactCta;
      break;
    case EVENT_TYPE_DEF.Navigation:
      highlight = getSimpleSceneName(event.tdEvent.clientEvent?.locationScene);
      message = 'location';
      color = 'tokenDetailsFGBlue.main';
      break;
    case EVENT_TYPE_DEF.NetworkError:
    case EVENT_TYPE_DEF.ApplicationError:
      highlight = event.tdEvent.clientEvent?.severity;
      message = `${event.tdEvent.clientEvent?.vshErrorHexCode} | ${event.tdEvent.clientEvent?.errorMessage}`;
      if (event.tdEvent.clientEvent?.severity === 'critical')
        color = 'tokenDetailsFGRed.main';
      if (event.tdEvent.clientEvent?.severity === 'major')
        color = 'tokenDetailsFGRed.main';
      if (event.tdEvent.clientEvent?.severity === 'normal')
        color = 'tokenDetailsFGOrange.main';
      break;
    case EVENT_TYPE_DEF.Startup:
      highlight = 'Vroom';
      color = 'tokenDetailsFGRed.main';
      break;
    case EVENT_TYPE_DEF.LoadTime:
      const metric = event.tdEvent.clientEvent?.metricsData?.[0];
      highlight = formatMilliseconds(metric?.latency ?? 0);
      message = metric?.metric;
      color = 'tokenDetailsFGOrange.main';
      if (message === 'timeToInteractive') {
        color = 'tokenDetailsFGRed.main';
      }
      break;
    default:
      message = event.tdEvent.clientEvent?.type;
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

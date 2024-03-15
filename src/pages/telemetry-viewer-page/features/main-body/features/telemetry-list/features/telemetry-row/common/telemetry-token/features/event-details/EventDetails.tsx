import { EVENT_TYPE_DEF } from '@pages/telemetry-viewer-page/features/main-body/features/telemetry-list/utils/TELEM_CONST.ts';
import {
  getEventDef,
  getSimpleSceneName,
} from '@pages/telemetry-viewer-page/features/main-body/features/telemetry-list/features/telemetry-row/utils/telemetry-utils.ts';
import { HStack } from '@common/mui-stacks.tsx';
import EventShortDescription from '@pages/telemetry-viewer-page/features/main-body/features/telemetry-list/features/telemetry-row/features/EventShortDescription.tsx';
import formatMilliseconds from '@utils/formatMilliseconds.ts';
import DetailDisplay from '@pages/telemetry-viewer-page/features/main-body/features/telemetry-list/features/telemetry-row/common/telemetry-token/features/event-details/parts/DetailDisplay.tsx';
export default function EventDetails({
  event,
  colorMode = 'dual',
  displayMode = 'full',
}: {
  event: TelemetryEventMessage;
  fontSize?: string;
  colorMode?: 'dual' | 'single' | 'none';
  displayMode?: 'full' | 'short';
}) {
  const eventDef = getEventDef(event);
  const includeColor = colorMode === 'dual';
  const includeMessage = displayMode === 'full';

  const renderNetworkError = () => {
    return renderDefault(); // TODO: implement me
  };
  const renderApplicationError = () => {
    return renderDefault(); // TODO: implement me
  };
  const renderDefault = () => {
    return (
      <HStack>
        <EventShortDescription event={event} />
      </HStack>
    );
  };

  let highlight, message, color;

  switch (eventDef) {
    case EVENT_TYPE_DEF.ViewableImpression:
      highlight = event.final.visualEntityType;
      message = event.final.interactCta;
      break;
    case EVENT_TYPE_DEF.Interaction:
      highlight = event.final.interactAction;
      message = event.final.interactCta;
      break;
    case EVENT_TYPE_DEF.Navigation:
      highlight = getSimpleSceneName(event.final.locationScene);
      message = 'location';
      color = 'tokenDetailsFGBlue.main';
      break;
    case EVENT_TYPE_DEF.NetworkError:
    case EVENT_TYPE_DEF.ApplicationError:
      highlight = event.final.severity;
      message = `${event.final.vshErrorHexCode} | ${event.final.errorMessage}`;
      if (event.final.severity === 'critical') color = 'tokenDetailsFGRed.main';
      if (event.final.severity === 'major') color = 'tokenDetailsFGRed.main';
      if (event.final.severity === 'normal')
        color = 'tokenDetailsFGOrange.main';
      break;
    case EVENT_TYPE_DEF.Startup:
      highlight = 'Vroom';
      color = 'tokenDetailsFGRed.main';
      break;
    case EVENT_TYPE_DEF.LoadTime:
      const metric = event.final.metricsData?.[0];
      highlight = formatMilliseconds(metric?.latency ?? 0);
      message = metric?.metric;
      color = 'tokenDetailsFGOrange.main';
      // color = 'tokenDetailsFGGreen.main';
      if (message === 'timeToInteractive') {
        color = 'tokenDetailsFGRed.main';
      }
      break;
    default:
      message = event.final?.type;
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

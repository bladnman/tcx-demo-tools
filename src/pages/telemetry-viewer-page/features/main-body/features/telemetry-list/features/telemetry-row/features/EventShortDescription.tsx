import {
  getErrorMessage,
  getEventDef,
  getImpressionMessage,
  getInteractionMessage,
  getLoadTimeMessageList,
  getNavigationMessage,
  getStartUpMessage,
} from '@pages/telemetry-viewer-page/features/main-body/features/telemetry-list/features/telemetry-row/utils/telemetry-utils.ts';
import { Typography } from '@mui/material';
import useTelemetryStore from '@pages/telemetry-viewer-page/store/useTelemetryStore.ts';
import { EVENT_TYPE_DEF } from '@pages/telemetry-viewer-page/features/main-body/features/telemetry-list/utils/TELEM_CONST.ts';

export default function EventShortDescription({
  event,
}: {
  event: TelemetryEventMessage;
}) {
  const { allowWrap } = useTelemetryStore((state) => ({
    allowWrap: state.allowWrap,
  }));
  const eventDef = getEventDef(event);
  const finalEvent = event.final;

  const getMessage = () => {
    switch (eventDef) {
      case EVENT_TYPE_DEF.ViewableImpression:
        return getImpressionMessage(finalEvent);
      case EVENT_TYPE_DEF.Interaction:
        return getInteractionMessage(finalEvent);
      case EVENT_TYPE_DEF.Navigation:
        return getNavigationMessage(finalEvent);
      case EVENT_TYPE_DEF.NetworkError:
        return getErrorMessage(finalEvent);
      case EVENT_TYPE_DEF.ApplicationError:
        return getErrorMessage(finalEvent);
      case EVENT_TYPE_DEF.Startup:
        return getStartUpMessage(finalEvent);
      case EVENT_TYPE_DEF.LoadTime:
        return getLoadTimeMessageList(finalEvent).join(' | ');
      default:
        return undefined;
    }
  };

  return (
    <Typography sx={{ whiteSpace: allowWrap ? 'normal' : 'nowrap' }}>
      {getMessage()}
    </Typography>
  );
}

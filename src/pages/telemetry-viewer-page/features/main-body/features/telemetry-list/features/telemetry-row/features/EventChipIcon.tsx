import { getEventDef } from '../utils/telemetry-utils.ts';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import TimerIcon from '@mui/icons-material/Timer';
import FlagIcon from '@mui/icons-material/Flag';
import NearbyErrorIcon from '@mui/icons-material/NearbyError';
import SignalWifiStatusbarConnectedNoInternet4Icon from '@mui/icons-material/SignalWifiStatusbarConnectedNoInternet4';
import AssistantDirectionIcon from '@mui/icons-material/AssistantDirection';
import { EVENT_TYPE_DEF } from '@pages/telemetry-viewer-page/features/main-body/features/telemetry-list/utils/TELEM_CONST.ts';
export default function EventChipIcon({
  event,
}: {
  event: TelemetryEventMessage;
}) {
  const eventDef = getEventDef(event);
  const fontSize = 'small';
  switch (eventDef) {
    case EVENT_TYPE_DEF.ViewableImpression:
      return <VisibilityIcon fontSize={fontSize} />;
    case EVENT_TYPE_DEF.Interaction:
      return <TouchAppIcon fontSize={fontSize} />;
    case EVENT_TYPE_DEF.Navigation:
      return <AssistantDirectionIcon fontSize={fontSize} />;
    case EVENT_TYPE_DEF.NetworkError:
      return (
        <SignalWifiStatusbarConnectedNoInternet4Icon fontSize={fontSize} />
      );
    case EVENT_TYPE_DEF.ApplicationError:
      return <NearbyErrorIcon fontSize={fontSize} />;
    case EVENT_TYPE_DEF.Startup:
      return <FlagIcon fontSize={fontSize} />;
    case EVENT_TYPE_DEF.LoadTime:
      return <TimerIcon fontSize={fontSize} />;
    default:
      return <FiberManualRecordIcon fontSize={fontSize} />;
  }
}

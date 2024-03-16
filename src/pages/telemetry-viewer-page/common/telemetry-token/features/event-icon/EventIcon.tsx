import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import TimerIcon from '@mui/icons-material/Timer';
import FlagIcon from '@mui/icons-material/Flag';
import NearbyErrorIcon from '@mui/icons-material/NearbyError';
import SignalWifiStatusbarConnectedNoInternet4Icon from '@mui/icons-material/SignalWifiStatusbarConnectedNoInternet4';
import AssistantDirectionIcon from '@mui/icons-material/AssistantDirection';
import { EVENT_TYPE_DEF } from '@pages/telemetry-viewer-page/utils/TELEM_CONST.ts';
import { getEventDef } from '@pages/telemetry-viewer-page/utils/telemetry-utils.ts';
export default function EventIcon({
  event,
  fontSize = '1em',
}: {
  event: TelemetryEventMessage;
  fontSize?: string;
}) {
  const eventDef = getEventDef(event);
  switch (eventDef) {
    case EVENT_TYPE_DEF.ViewableImpression:
      // @ts-expect-error - forcing em as fontSize, this allows the icon to scale with the font size
      return <VisibilityIcon fontSize={fontSize} />;
    case EVENT_TYPE_DEF.Interaction:
      // @ts-expect-error - forcing em as fontSize, this allows the icon to scale with the font size
      return <TouchAppIcon fontSize={fontSize} />;
    case EVENT_TYPE_DEF.Navigation:
      // @ts-expect-error - forcing em as fontSize, this allows the icon to scale with the font size
      return <AssistantDirectionIcon fontSize={fontSize} />;
    case EVENT_TYPE_DEF.NetworkError:
      return (
        // @ts-expect-error - forcing em as fontSize, this allows the icon to scale with the font size
        <SignalWifiStatusbarConnectedNoInternet4Icon fontSize={fontSize} />
      );
    case EVENT_TYPE_DEF.ApplicationError:
      // @ts-expect-error - forcing em as fontSize, this allows the icon to scale with the font size
      return <NearbyErrorIcon fontSize={fontSize} />;
    case EVENT_TYPE_DEF.Startup:
      // @ts-expect-error - forcing em as fontSize, this allows the icon to scale with the font size
      return <FlagIcon fontSize={fontSize} />;
    case EVENT_TYPE_DEF.LoadTime:
      // @ts-expect-error - forcing em as fontSize, this allows the icon to scale with the font size
      return <TimerIcon fontSize={fontSize} />;
    default:
      // @ts-expect-error - forcing em as fontSize, this allows the icon to scale with the font size
      return <FiberManualRecordIcon fontSize={fontSize} />;
  }
}

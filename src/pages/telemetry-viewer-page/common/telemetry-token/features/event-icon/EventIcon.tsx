import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import TimerIcon from '@mui/icons-material/Timer';
import FlagIcon from '@mui/icons-material/Flag';
import NearbyErrorIcon from '@mui/icons-material/NearbyError';
import SignalWifiStatusbarConnectedNoInternet4Icon from '@mui/icons-material/SignalWifiStatusbarConnectedNoInternet4';
import AssistantDirectionIcon from '@mui/icons-material/AssistantDirection';
import { EVENT_TYPE_DEF } from '@pages/telemetry-viewer-page/constants/EVENT_TYPE.ts';
import { getEventDef } from '@pages/telemetry-viewer-page/utils/event-utils/getEventDef.ts';
import getTvValue from '@pages/telemetry-viewer-page/utils/event-utils/getTvValue.ts';
import {
  mdiAlert,
  mdiCheck,
  mdiDebugStepOver,
  mdiFlag,
  mdiPause,
  mdiPlay,
  mdiPlayOutline,
  mdiProgressHelper,
  mdiStop,
} from '@mdi/js';
import Icon from '@mdi/react';

export default function EventIcon({
  event,
  fontSize = '1em',
}: {
  event: TVEvent;
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
    case EVENT_TYPE_DEF.VideoStream:
      const videoEventType = getTvValue(event, 'videoEventType');
      if (videoEventType) {
        switch ((videoEventType as string).toLowerCase()) {
          case 'start':
            return <Icon path={mdiFlag} size={fontSize} />;
          case 'play':
            return <Icon path={mdiPlay} size={fontSize} />;
          case 'resume':
            return <Icon path={mdiPlayOutline} size={fontSize} />;
          case 'stop':
          case 'end':
            return <Icon path={mdiStop} size={fontSize} />;
          case 'pause':
            return <Icon path={mdiPause} size={fontSize} />;
          case 'seek':
            return <Icon path={mdiDebugStepOver} size={fontSize} />;
          case 'error':
            return <Icon path={mdiAlert} size={fontSize} />;
          case 'progress':
            return <Icon path={mdiProgressHelper} size={fontSize} />;
          case 'complete':
            return <Icon path={mdiCheck} size={fontSize} />;
        }
      }
      // @ts-expect-error - forcing em as fontSize, this allows the icon to scale with the font size
      return <FiberManualRecordIcon fontSize={fontSize} />;
    default:
      // @ts-expect-error - forcing em as fontSize, this allows the icon to scale with the font size
      return <FiberManualRecordIcon fontSize={fontSize} />;
  }
}

import TWEvent from '@classes/data/TWEvent.ts';
import { EVENT_TYPE_DEF } from '@const/EVENT_TYPE.ts';
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
import AssistantDirectionIcon from '@mui/icons-material/AssistantDirection';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import FlagIcon from '@mui/icons-material/Flag';
import NearbyErrorIcon from '@mui/icons-material/NearbyError';
import SignalWifiStatusbarConnectedNoInternet4Icon from '@mui/icons-material/SignalWifiStatusbarConnectedNoInternet4';
import TimerIcon from '@mui/icons-material/Timer';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { getEventDef } from '@utils/event-utils/event-def/getEventDef.ts';

export default function EventIcon({
  event,
  fontSize = '1em',
}: {
  event: TWEvent;
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
      const videoEventType = event.getStr('videoEventType');
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

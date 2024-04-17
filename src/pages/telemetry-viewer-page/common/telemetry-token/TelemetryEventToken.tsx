import TelemetryToken from '@pages/telemetry-viewer-page/common/telemetry-token/TelemetryToken.tsx';
import EventIcon from '@pages/telemetry-viewer-page/common/telemetry-token/features/event-icon/EventIcon.tsx';
import EventDetails from '@pages/telemetry-viewer-page/common/telemetry-token/features/event-details/EventDetails.tsx';
import useSettingsStore from '@pages/telemetry-viewer-page/store/settings-store/useSettingsStore.ts';
import { getEventDef } from '@pages/telemetry-viewer-page/utils/event-utils/getEventDef.ts';

interface TelemetryEventTokenProps extends TelemetryTokenProps {
  event: TVEvent;
}
export default function TelemetryEventToken(props: TelemetryEventTokenProps) {
  const { event } = props;
  const { tokenMode: storeTokenMode } = useSettingsStore();
  const { tokenFontSize: storeTokenFontSize } = useSettingsStore();
  const { tokenColorMode: storeTokenColorMode } = useSettingsStore();
  const { tokenWidth: storeTokenWidth } = useSettingsStore();

  const tokenMode = storeTokenMode || props.tokenMode || 'details';
  const tokenFontSize = storeTokenFontSize || props.tokenFontSize || 1;
  const tokenColorMode = storeTokenColorMode || props.tokenColorMode || 'dual';
  const tokenWidth = storeTokenWidth || props.tokenWidth || 'min';

  const eventDef = getEventDef(event);

  return (
    <TelemetryToken
      eventIcon={<EventIcon event={event} fontSize={'1em'} />}
      eventDetails={<EventDetails event={event} colorMode={tokenColorMode} />}
      eventColor={eventDef.color}
      eventTag={eventDef.abbreviation}
      tokenFontSize={tokenFontSize}
      tokenColorMode={tokenColorMode}
      tokenMode={tokenMode}
      tokenWidth={tokenWidth}
    />
  );
}

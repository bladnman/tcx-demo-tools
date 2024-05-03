import BaseToken from '@common/event-token/parts/BaseToken.tsx';
import EventIcon from '@common/event-token/features/event-icon/EventIcon.tsx';
import EventDetails from '@common/event-token/features/event-details/EventDetails.tsx';
import useSettingsStore from '@store/settings-store/useSettingsStore.ts';
import { getEventDef } from '@utils//event-utils/getEventDef.ts';
import EventTag from '@common/event-tag/EventTag.tsx';

interface TelemetryEventTokenProps extends TelemetryTokenProps {
  event: TVEvent;
}
export default function EventToken(props: TelemetryEventTokenProps) {
  const { event } = props;
  const storeTokenMode = useSettingsStore((state) => state.tokenMode);
  const storeTokenFontSize = useSettingsStore((state) => state.tokenFontSize);
  const storeTokenColorMode = useSettingsStore((state) => state.tokenColorMode);
  const storeTokenWidth = useSettingsStore((state) => state.tokenWidth);

  const tokenMode = storeTokenMode || props.tokenMode || 'details';
  const tokenFontSize = storeTokenFontSize || props.tokenFontSize || 1;
  const tokenColorMode = storeTokenColorMode || props.tokenColorMode || 'dual';
  const tokenWidth = storeTokenWidth || props.tokenWidth || 'min';

  const eventDef = getEventDef(event);

  return (
    <BaseToken
      eventIcon={<EventIcon event={event} fontSize={'1em'} />}
      eventDetails={<EventDetails event={event} colorMode={tokenColorMode} />}
      eventTag={<EventTag event={event} />}
      eventColor={eventDef.color}
      eventAbbrv={eventDef.abbreviation}
      tokenFontSize={tokenFontSize}
      tokenColorMode={tokenColorMode}
      tokenMode={tokenMode}
      tokenWidth={tokenWidth}
    />
  );
}

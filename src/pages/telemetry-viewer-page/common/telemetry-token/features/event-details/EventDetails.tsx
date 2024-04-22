import DetailDisplay from '@pages/telemetry-viewer-page/common/telemetry-token/features/event-details/parts/DetailDisplay.tsx';
import getEventDescriptions from '@pages/telemetry-viewer-page/utils/event-utils/getEventDescriptions.ts';
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
  const includeColor = colorMode === 'dual';
  const includeMessage = displayMode === 'details';
  const {
    highlight,
    message,
    color = 'tokenDetailsFGBright.main',
  } = getEventDescriptions(event);
  const finalMessage = includeMessage ? message : undefined;

  // bail - no highlight or message
  if (highlight === undefined && finalMessage === undefined) return null;

  return (
    <DetailDisplay
      highlight={highlight as string}
      message={finalMessage as string}
      color={includeColor ? color : undefined}
    />
  );
}

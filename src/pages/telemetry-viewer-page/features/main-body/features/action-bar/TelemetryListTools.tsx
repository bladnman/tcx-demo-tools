import { HStack } from '@common/mui-stacks.tsx';
import EventTypeAutocomplete from '@pages/telemetry-viewer-page/features/main-body/features/action-bar/features/EventTypeAutocomplete.tsx';
import TelemetryPublisher from '@pages/telemetry-viewer-page/features/TelemetryPublisher.tsx';
import ClearButton from '@pages/telemetry-viewer-page/features/main-body/features/action-bar/features/ClearButton.tsx';
import WrapButton from '@pages/telemetry-viewer-page/features/main-body/features/action-bar/features/WrapButton.tsx';
import TokenSize from '@pages/telemetry-viewer-page/features/main-body/features/action-bar/features/TokenSize.tsx';
import TokenWidth from '@pages/telemetry-viewer-page/features/main-body/features/action-bar/features/TokenWidth.tsx';
import TokenColorMode from '@pages/telemetry-viewer-page/features/main-body/features/action-bar/features/TokenColorMode.tsx';
import TokenFontSize from '@pages/telemetry-viewer-page/features/main-body/features/action-bar/features/TokenFontSize.tsx';
export default function TelemetryListTools() {
  return (
    <HStack spacing={2} sx={{ px: 1 }} hFill hAlign={'leading'}>
      <TelemetryPublisher />
      <WrapButton />
      <EventTypeAutocomplete />
      <TokenSize />
      <TokenWidth />
      <TokenColorMode />
      <TokenFontSize />
      <ClearButton />
    </HStack>
  );
}

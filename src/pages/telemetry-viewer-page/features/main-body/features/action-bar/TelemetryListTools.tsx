import { HStack } from '@common/mui-stacks.tsx';
import ClearButton from '@pages/telemetry-viewer-page/features/main-body/features/action-bar/features/og/ClearButton.tsx';
import WrapButton from '@pages/telemetry-viewer-page/features/main-body/features/action-bar/features/og/WrapButton.tsx';
import TokenSize from '@pages/telemetry-viewer-page/features/main-body/features/action-bar/features/og/TokenSize.tsx';
import TokenWidth from '@pages/telemetry-viewer-page/features/main-body/features/action-bar/features/og/TokenWidth.tsx';
import TokenColorMode from '@pages/telemetry-viewer-page/features/main-body/features/action-bar/features/og/TokenColorMode.tsx';
import TokenFontSize from '@pages/telemetry-viewer-page/features/main-body/features/action-bar/features/og/TokenFontSize.tsx';
import TelemetryPublisherSelector from '@pages/telemetry-viewer-page/features/general-app-parts/publishers/TelemetryPublisherSelector.tsx';
export default function TelemetryListTools() {
  return (
    <HStack spacing={2} sx={{ px: 1 }} hFill hAlign={'leading'}>
      <TelemetryPublisherSelector />
      <WrapButton />
      <TokenSize />
      <TokenWidth />
      <TokenColorMode />
      <TokenFontSize />
      <ClearButton />
    </HStack>
  );
}

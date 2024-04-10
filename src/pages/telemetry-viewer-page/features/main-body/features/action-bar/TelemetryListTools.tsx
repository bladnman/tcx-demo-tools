import { HStack } from '@common/mui-stacks.tsx';
import ClearButton from '@pages/telemetry-viewer-page/features/main-body/features/action-bar/features/ClearButton.tsx';
import WrapButton from '@pages/telemetry-viewer-page/features/main-body/features/action-bar/features/WrapButton.tsx';
import TokenSize from '@pages/telemetry-viewer-page/features/main-body/features/action-bar/features/TokenSize.tsx';
import TokenWidth from '@pages/telemetry-viewer-page/features/main-body/features/action-bar/features/TokenWidth.tsx';
import TokenColorMode from '@pages/telemetry-viewer-page/features/main-body/features/action-bar/features/TokenColorMode.tsx';
import TokenFontSize from '@pages/telemetry-viewer-page/features/main-body/features/action-bar/features/TokenFontSize.tsx';
import TelemetryPublisherSelector from '@pages/telemetry-viewer-page/features/TelemetryPublisherSelector.tsx';
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

import TelemetryList from '@pages/telemetry-viewer-page/features/telemetry-list/TelemetryList.tsx';
import { HStack, VStack } from '@components/mui-stacks.tsx';
import TelemetryListTools from '@pages/telemetry-viewer-page/features/telemetry-list/features/telemetry-list-tools/TelemetryListTools.tsx';
import useTelemetryStore from '@pages/telemetry-viewer-page/store/useTelemetryStore.ts';

export default function TelemetryMainBody() {
  const { appBarHeight } = useTelemetryStore();
  return (
    <VStack
      fill
      vAlign={'leading'}
      hAlign={'leading'}
      sx={{ position: 'relative' }}
      spacing={0}
    >
      <HStack
        hFill
        spacing={2}
        vAlign={'leading'}
        hAlign={'leading'}
        sx={{
          position: 'sticky',
          top: `${appBarHeight - 1}px`,
          width: '100%',
          // left: 0,
          // right: 0,
          backgroundColor: 'bg.dark',
          py: 1,
        }}
      >
        <TelemetryListTools />
      </HStack>

      <VStack fill vAlign={'leading'} hAlign={'leading'} padding={1}>
        <TelemetryList />
      </VStack>
    </VStack>
  );
}
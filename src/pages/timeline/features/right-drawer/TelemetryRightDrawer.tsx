import { VStack } from '@common/mui-stacks.tsx';
import InspectorPanel from '@features/inspector-panel/InspectorPanel.tsx';

export default function TelemetryRightDrawer() {
  return (
    <VStack fill top>
      <InspectorPanel />
    </VStack>
  );
}

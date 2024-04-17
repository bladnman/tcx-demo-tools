import { HStack } from '@common/mui-stacks.tsx';
import ConnectionButton from '@pages/telemetry-viewer-page/features/main-body/features/action-bar/features/ConnectionButton.tsx';
import OverflowButton from '@pages/telemetry-viewer-page/features/main-body/features/action-bar/features/overflow-button/OverflowButton.tsx';
export default function AppBarTools() {
  return (
    <HStack>
      <HStack sx={{ px: 2 }}>
        <ConnectionButton />
      </HStack>
      <OverflowButton />
    </HStack>
  );
}

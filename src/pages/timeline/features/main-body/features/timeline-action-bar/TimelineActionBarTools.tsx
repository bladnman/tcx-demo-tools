import { HStack } from '@common/mui-stacks.tsx';
import ConnectionButton from '@pages/timeline/features/main-body/features/timeline-action-bar/features/connect-button/ConnectionButton.tsx';
import OverflowButton from '@pages/timeline/features/main-body/features/timeline-action-bar/features/overflow-button/OverflowButton.tsx';
export default function TimelineActionBarTools() {
  return (
    <HStack>
      <HStack sx={{ px: 2 }}>
        <ConnectionButton />
      </HStack>
      <OverflowButton />
    </HStack>
  );
}

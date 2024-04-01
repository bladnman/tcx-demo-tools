import { HStack, VStack } from '@common/mui-stacks.tsx';

export default function WelcomePage() {
  return (
    <VStack>
      <h3>Welcome to TCx Demo Tools</h3>
      <HStack>
        <a href={'/telemetry'}>Telemetry Viewer</a> |
        <a href={'/tcx2'}>TCx 2.0</a>
      </HStack>
    </VStack>
  );
}

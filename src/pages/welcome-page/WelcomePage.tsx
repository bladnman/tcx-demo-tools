import { HStack, VStack } from '@components/mui-stacks.tsx';

export default function WelcomePage() {
  return (
    <VStack>
      <h3>Welcome to TCx Demo Tools</h3>
      <HStack>
        <a href={'/telemetry'}>Telemetry Viewer</a>
      </HStack>
    </VStack>
  );
}

import { HStack } from '@common/mui-stacks.tsx';
import SettingButton from '@pages/telemetry-viewer-page/features/main-body/features/action-bar/features/SettingButton.tsx';
import ClearEventsButton from '@pages/telemetry-viewer-page/features/main-body/features/action-bar/features/ClearEventsButton.tsx';
import DisconnectButton from '@pages/telemetry-viewer-page/features/main-body/features/action-bar/features/DisconnectButton.tsx';
import ImportExportButton from '@pages/telemetry-viewer-page/features/main-body/features/action-bar/features/ImportExportButton.tsx';
export default function AppBarTools() {
  return (
    <HStack>
      <DisconnectButton />
      <ImportExportButton />
      <ClearEventsButton />
      <SettingButton />
    </HStack>
  );
}

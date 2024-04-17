import { VStack } from '@common/mui-stacks.tsx';
import { FormControlLabel, Switch } from '@mui/material';
import useSettingsStore from '@pages/telemetry-viewer-page/store/settings-store/useSettingsStore.ts';
import actionSetShouldShowTime from '@pages/telemetry-viewer-page/store/settings-store/actions/actionSetShouldShowTime.ts';

export default function DisplayOptions() {
  const { allowWrap } = useSettingsStore();
  const { shouldShowTime } = useSettingsStore();

  return (
    <VStack hFill topLeft>
      <FormControlLabel
        control={<Switch checked={allowWrap} onChange={() => actionSetAllowWrap(!allowWrap)} />}
        label="Wrap"
      />
      <FormControlLabel
        control={<Switch checked={shouldShowTime} onChange={() => actionSetShouldShowTime(!shouldShowTime)} />}
        label="Show Time"
      />
    </VStack>
  );
}

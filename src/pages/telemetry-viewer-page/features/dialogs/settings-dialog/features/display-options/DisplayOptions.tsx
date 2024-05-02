import { VStack } from '@common/mui-stacks.tsx';
import { FormControlLabel, Switch, Typography } from '@mui/material';
import useSettingsStore from '@pages/telemetry-viewer-page/store/settings-store/useSettingsStore.ts';
import actionSetShouldShowTime from '@pages/telemetry-viewer-page/store/settings-store/actions/actionSetShouldShowTime.ts';

export default function DisplayOptions() {
  const shouldShowTime = useSettingsStore((state) => state.shouldShowTime);

  return (
    <VStack hFill topLeft>
      <Typography>Imagine the possibilities...</Typography>
      <FormControlLabel
        disabled={false}
        control={
          <Switch
            checked={shouldShowTime}
            onChange={() => actionSetShouldShowTime(!shouldShowTime)}
          />
        }
        label="Show Time"
      />
      <FormControlLabel
        disabled={true}
        control={
          <Switch
            checked={false}
            onChange={() => console.log('Sorry Stevie... not yet.')}
          />
        }
        label="Stevi Mode (coming soon?)"
      />
    </VStack>
  );
}

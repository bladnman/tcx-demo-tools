import { VStack } from '@common/mui-stacks.tsx';
import { FormControlLabel, Switch } from '@mui/material';
import useTelemetryStore from '@pages/telemetry-viewer-page/store/useTelemetryStore.ts';

export default function DisplayOptions() {
  const { allowWrap, setAllowWrap } = useTelemetryStore();
  const { shouldShowTime, setShouldShowTime } = useTelemetryStore();

  return (
    <VStack hFill topLeft>
      <FormControlLabel
        control={
          <Switch
            checked={allowWrap}
            onChange={() => setAllowWrap(!allowWrap)}
          />
        }
        label="Wrap"
      />
      <FormControlLabel
        control={
          <Switch
            checked={shouldShowTime}
            onChange={() => setShouldShowTime(!shouldShowTime)}
          />
        }
        label="Show Time"
      />
    </VStack>
  );
}

import { FormControlLabel, Switch } from '@mui/material';
import useTelemetryStore from '@pages/telemetry-viewer-page/store/useTelemetryStore.ts';

export default function WrapButton() {
  const { allowWrap, setAllowWrap } = useTelemetryStore();
  return (
    <FormControlLabel
      control={
        <Switch checked={allowWrap} onChange={() => setAllowWrap(!allowWrap)} />
      }
      label="Wrap"
    />
  );
}

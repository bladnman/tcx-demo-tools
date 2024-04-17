import { FormControlLabel, Switch } from '@mui/material';
import useSettingsStore from '@pages/telemetry-viewer-page/store/settings-store/useSettingsStore.ts';
import actionSetAllowWrap from '@pages/telemetry-viewer-page/store/settings-store/actions/actionSetAllowWrap.ts';

export default function WrapButton() {
  const { allowWrap } = useSettingsStore();
  return (
    <FormControlLabel
      control={<Switch checked={allowWrap} onChange={() => actionSetAllowWrap(!allowWrap)} />}
      label="Wrap"
    />
  );
}

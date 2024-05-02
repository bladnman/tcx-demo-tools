import useSettingsStore from '@pages/telemetry-viewer-page/store/settings-store/useSettingsStore.ts';
import { actionSetConnectToTcxName } from '@pages/telemetry-viewer-page/store/settings-store/actions/actionSetConnectToTcxName.ts';

export default function actionUpdateConnectToTCxName() {
  const cnxPlatform = useSettingsStore.getState().cnxPlatform;
  actionSetConnectToTcxName(cnxPlatform);
}

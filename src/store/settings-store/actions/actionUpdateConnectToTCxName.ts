import useSettingsStore from '@store/settings-store/useSettingsStore.ts';
import { actionSetConnectToTcxName } from '@store/settings-store/actions/actionSetConnectToTcxName.ts';

export default function actionUpdateConnectToTCxName() {
  const cnxPlatform = useSettingsStore.getState().cnxPlatform;
  actionSetConnectToTcxName(cnxPlatform);
}

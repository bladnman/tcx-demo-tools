import useSettingsStore from '@store/settings-store/useSettingsStore.ts';

export default function actionSetCnxIpAddress(ipAddress: string | null) {
  useSettingsStore.setState({ cnxIpAddress: ipAddress });
}

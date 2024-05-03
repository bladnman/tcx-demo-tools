import useSettingsStore from '@store/settings-store/useSettingsStore.ts';

export default function actionClearConnectToTCxName() {
  useSettingsStore.setState({ connectToTCxName: null });
}

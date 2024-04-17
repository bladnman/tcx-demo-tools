import useSettingsStore from '@pages/telemetry-viewer-page/store/settings-store/useSettingsStore.ts';

export default function actionClearConnectToTCxName() {
  useSettingsStore.setState({ connectToTCxName: null });
}

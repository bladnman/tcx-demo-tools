import useSettingsStore from '@pages/telemetry-viewer-page/store/settings-store/useSettingsStore.ts';

export default function actionSetConnectedViaTCx(isConnectedViaTCx: boolean) {
  useSettingsStore.setState({ isConnectedViaTCx });
}

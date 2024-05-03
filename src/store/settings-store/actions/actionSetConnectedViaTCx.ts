import useSettingsStore from '@store/settings-store/useSettingsStore.ts';

export default function actionSetConnectedViaTCx(isConnectedViaTCx: boolean) {
  useSettingsStore.setState({ isConnectedViaTCx });
}

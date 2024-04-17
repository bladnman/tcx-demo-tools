import useSettingsStore from '@pages/telemetry-viewer-page/store/settings-store/useSettingsStore.ts';

export default function actionSetTokenColorMode(tokenColorMode: TokenColorMode) {
  useSettingsStore.setState({ tokenColorMode });
}

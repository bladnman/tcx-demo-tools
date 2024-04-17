import useSettingsStore from '@pages/telemetry-viewer-page/store/settings-store/useSettingsStore.ts';

export default function actionSetTokenFontSize(tokenFontSize: number) {
  useSettingsStore.setState({ tokenFontSize });
}

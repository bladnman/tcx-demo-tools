import useSettingsStore from '@pages/telemetry-viewer-page/store/settings-store/useSettingsStore.ts';

export default function actionSetShouldShowTime(shouldShowTime: boolean) {
  useSettingsStore.setState({ shouldShowTime });
}

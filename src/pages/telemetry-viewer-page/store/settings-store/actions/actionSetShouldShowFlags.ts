import useSettingsStore from '@pages/telemetry-viewer-page/store/settings-store/useSettingsStore.ts';

export default function actionSetShouldShowFlags(shouldShowFlags: boolean) {
  useSettingsStore.setState({ shouldShowFlags });
}

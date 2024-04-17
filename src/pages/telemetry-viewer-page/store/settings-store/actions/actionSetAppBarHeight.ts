import useSettingsStore from '@pages/telemetry-viewer-page/store/settings-store/useSettingsStore.ts';

export default function actionSetAppBarHeight(height: number) {
  useSettingsStore.setState({ appBarHeight: height });
}

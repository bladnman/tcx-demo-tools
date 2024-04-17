import useSettingsStore from '@pages/telemetry-viewer-page/store/settings-store/useSettingsStore.ts';

export default function actionSetAllowWrap(allowWrap: boolean) {
  useSettingsStore.setState({ allowWrap });
}

import useSettingsStore from '@pages/telemetry-viewer-page/store/settings-store/useSettingsStore.ts';

export default function actionSetMaxDisplayEventCount(value: number) {
  useSettingsStore.setState({ maxDisplayEventCount: value });
}

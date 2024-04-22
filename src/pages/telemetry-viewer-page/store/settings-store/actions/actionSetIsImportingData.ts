import useSettingsStore from '@pages/telemetry-viewer-page/store/settings-store/useSettingsStore.ts';

export default function actionSetIsImportingData(isImportingData: boolean) {
  useSettingsStore.setState({ isImportingData });
}

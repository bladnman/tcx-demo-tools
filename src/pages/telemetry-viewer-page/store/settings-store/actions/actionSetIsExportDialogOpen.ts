import useSettingsStore from '@pages/telemetry-viewer-page/store/settings-store/useSettingsStore.ts';

export default function actionSetIsExportDialogOpen(isExportDialogOpen: boolean) {
  useSettingsStore.setState({ isExportDialogOpen });
}

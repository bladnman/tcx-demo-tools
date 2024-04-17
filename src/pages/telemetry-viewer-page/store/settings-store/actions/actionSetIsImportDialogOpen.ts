import useSettingsStore from '@pages/telemetry-viewer-page/store/settings-store/useSettingsStore.ts';

export default function actionSetIsImportDialogOpen(isImportDialogOpen: boolean) {
  useSettingsStore.setState({ isImportDialogOpen, importingEvents: null });
}

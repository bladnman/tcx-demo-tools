import useSettingsStore from '@store/settings-store/useSettingsStore.ts';

export default function actionSetIsExportDialogOpen(isExportDialogOpen: boolean) {
  useSettingsStore.setState({ isExportDialogOpen });
}

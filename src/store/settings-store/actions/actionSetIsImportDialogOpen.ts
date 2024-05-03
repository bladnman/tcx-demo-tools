import useSettingsStore from '@store/settings-store/useSettingsStore.ts';

export default function actionSetIsImportDialogOpen(isImportDialogOpen: boolean) {
  useSettingsStore.setState({ isImportDialogOpen, importingEvents: null });
}

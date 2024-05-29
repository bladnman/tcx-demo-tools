import useSettingsStore from '@store/settings-store/useSettingsStore.ts';

export default function actionSetIsMerlinImportDialogOpen(
  isMerlinImportDialogOpen: boolean,
) {
  useSettingsStore.setState({ isMerlinImportDialogOpen });
}

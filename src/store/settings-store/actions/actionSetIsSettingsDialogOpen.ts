import useSettingsStore from '@store/settings-store/useSettingsStore.ts';

export default function actionSetIsSettingsDialogOpen(isSettingsDialogOpen: boolean) {
  useSettingsStore.setState({ isSettingsDialogOpen });
}

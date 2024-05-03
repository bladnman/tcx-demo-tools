import useSettingsStore from '@store/settings-store/useSettingsStore.ts';

export default function actionSetIsTagEditorDialogOpen(isTagEditorDialogOpen: boolean) {
  useSettingsStore.setState({ isTagEditorDialogOpen });
  if (!isTagEditorDialogOpen) {
    useSettingsStore.setState({ tagKeyForEdit: null });
  }
}

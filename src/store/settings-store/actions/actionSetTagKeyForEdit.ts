import useSettingsStore from '@store/settings-store/useSettingsStore.ts';

export default function actionSetTagKeyForEdit(tagKeyForEdit: string | null) {
  useSettingsStore.setState({ tagKeyForEdit, isTagEditorDialogOpen: !!tagKeyForEdit });
}

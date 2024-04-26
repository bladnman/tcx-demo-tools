import useSettingsStore from '@pages/telemetry-viewer-page/store/settings-store/useSettingsStore.ts';

export default function actionSetTagKeyForEdit(tagKeyForEdit: string | null) {
  useSettingsStore.setState({ tagKeyForEdit, isTagEditorDialogOpen: !!tagKeyForEdit });
}

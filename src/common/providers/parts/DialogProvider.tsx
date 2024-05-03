import SettingsDialog from '@dialogs/settings-dialog/SettingsDialog.tsx';
import AppDropDialog from '@dialogs/app-drop-dialog/AppDropDialog.tsx';
import ImportDialog from '@dialogs/import-dialog/ImportDialog.tsx';
import ExportDialog from '@dialogs/export-dialog/ExportDialog.tsx';
import TagEditorDialog from '@dialogs/tag-editor-dialog/TagEditorDialog.tsx';

export default function DialogProvider() {
  return (
    <>
      <SettingsDialog />
      <TagEditorDialog />
      <ImportDialog />
      <ExportDialog />
      <AppDropDialog />
    </>
  );
}

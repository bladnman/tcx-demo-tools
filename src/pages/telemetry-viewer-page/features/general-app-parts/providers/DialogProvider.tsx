import SettingsDialog from '@pages/telemetry-viewer-page/features/dialogs/settings-dialog/SettingsDialog.tsx';
import AppDropDialog from '@pages/telemetry-viewer-page/features/dialogs/app-drop-dialog/AppDropDialog.tsx';
import ImportDialog from '@pages/telemetry-viewer-page/features/dialogs/import-dialog/ImportDialog.tsx';
import ExportDialog from '@pages/telemetry-viewer-page/features/dialogs/export-dialog/ExportDialog.tsx';
import TagEditorDialog from '@pages/telemetry-viewer-page/features/dialogs/tag-editor-dialog/TagEditorDialog.tsx';

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

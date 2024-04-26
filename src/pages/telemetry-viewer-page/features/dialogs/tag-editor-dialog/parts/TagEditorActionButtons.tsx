import { Button, DialogActions } from '@mui/material';
import { useTagEditorContext } from '@pages/telemetry-viewer-page/features/dialogs/tag-editor-dialog/hooks/useTagEditorContext.ts';
import { HStack } from '@common/mui-stacks.tsx';

type Props = {
  onSave: (flagConfig: TagConfig) => void;
  onCancel: (flagConfig: TagConfig) => void;
  onDelete: (flagConfig: TagConfig) => void;
  onDuplicate?: () => void;
  saveLabel?: string;
  deleteLabel?: string;
  cancelLabel?: string;
  saveDisabled?: boolean;
  deleteDisabled?: boolean;
  duplicateDisabled?: boolean;
};
export default function TagEditorActionButtons({
  onSave,
  onCancel,
  onDelete,
  onDuplicate,
  saveLabel = 'Save',
  deleteLabel = 'Delete',
  cancelLabel = 'Cancel',
  saveDisabled = false,
  deleteDisabled = false,
  duplicateDisabled = true,
}: Props) {
  const editorCtx = useTagEditorContext();
  const { tagConfig, tagIcon, tagKey, tagThemeColor, isActive, rules } = editorCtx;

  const handleSave = () => {
    tagConfig.icon = tagIcon;
    tagConfig.key = tagKey;
    tagConfig.themeColor = tagThemeColor;
    tagConfig.isActive = isActive;
    tagConfig.rules = rules;

    onSave && onSave(tagConfig);
  };

  const isDuplicateAvailable = !!onDuplicate && !duplicateDisabled;
  return (
    <DialogActions sx={{ width: '100%' }}>
      <HStack hFill spaceBetween right>
        <HStack>
          {!deleteDisabled && (
            <Button color={'error'} onClick={() => onDelete?.(tagConfig)}>
              {deleteLabel}
            </Button>
          )}
        </HStack>
        <HStack>
          <Button onClick={() => onCancel?.(tagConfig)} sx={{ color: 'fg50.main' }}>
            {cancelLabel}
          </Button>
          {isDuplicateAvailable && (
            <Button color={'secondary'} onClick={() => onDuplicate?.()}>
              Duplicate
            </Button>
          )}
          <Button
            onClick={handleSave}
            disabled={saveDisabled}
            variant={'contained'}
            color={'primary'}
          >
            {saveLabel}
          </Button>
        </HStack>
      </HStack>
    </DialogActions>
  );
}

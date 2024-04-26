import React from 'react';
import { Box, FormControlLabel, FormGroup, Switch, TextField } from '@mui/material';
import { HStack } from '@common/mui-stacks.tsx';
import { useTagEditorContext } from '@pages/telemetry-viewer-page/features/dialogs/tag-editor-dialog/hooks/useTagEditorContext.ts';
import TagStyleDropbox from '@pages/telemetry-viewer-page/features/dialogs/tag-editor-dialog/parts/TagStyleDropbox.tsx';
import IconSelection from '@pages/telemetry-viewer-page/common/icon-selector/IconSelection.tsx';

export default function TagTagForm() {
  const editorCtx = useTagEditorContext();

  const {
    tagIcon = '🙊',
    setTagIcon,
    tagKey,
    setTagKey,
    tagThemeColor,
    setTagThemeColor,
    isActive,
    setIsActive,
    isDuplicateKey,
    isValidKey,
    isValidIcon,
    isDefaultTag,
  } = editorCtx;

  const isInvalidValue = !isValidKey && tagKey !== '';
  return (
    <HStack
      hFill
      left
      spacing={2}
      sx={{
        px: 1,
        backgroundColor: 'bg.main',
        borderColor: 'bg.main',
        borderStyle: 'solid',
        borderWidth: '1px',
        borderRadius: '4px',
      }}
    >
      {/* icon */}
      <IconSelection
        icon={tagIcon?.length ? tagIcon : '🙊'}
        error={!isValidIcon}
        onChange={(emoji: string) => {
          setTagIcon(emoji);
        }}
      />
      {/* key */}
      <TextField
        label={
          isDuplicateKey ? 'Duplicate name' : isInvalidValue ? 'Invalid name' : 'Name'
        }
        variant="standard"
        error={isInvalidValue || isDuplicateKey}
        disabled={isDefaultTag}
        defaultValue={tagKey}
        onChange={(ev: React.ChangeEvent<HTMLInputElement>): void => {
          setTagKey(ev.target.value);
        }}
        sx={{
          marginTop: 2,
          marginBottom: 2,
          marginRight: 2,
          width: '14em',
          flexGrow: 1,
        }}
      />
      {/* style */}
      <TagStyleDropbox
        tagIcon={tagIcon}
        tagKey={tagKey}
        defaultColorName={tagThemeColor}
        onChange={(colorName: string) => {
          setTagThemeColor(colorName);
        }}
      />
      {/* active */}
      <Box paddingX={3}>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={isActive}
                onChange={() => {
                  setIsActive(!isActive);
                }}
              />
            }
            label={isActive ? 'Active' : 'Inactive'}
          />
        </FormGroup>
      </Box>
    </HStack>
  );
}

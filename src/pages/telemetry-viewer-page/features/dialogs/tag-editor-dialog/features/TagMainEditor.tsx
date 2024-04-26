import { useEffect, useRef } from 'react';
import { DialogContent, Typography } from '@mui/material';
import uuid from 'react-uuid';
import { useTagEditorContext } from '@pages/telemetry-viewer-page/features/dialogs/tag-editor-dialog/hooks/useTagEditorContext.ts';
import TagEditorActionButtons from '@pages/telemetry-viewer-page/features/dialogs/tag-editor-dialog/parts/TagEditorActionButtons.tsx';
import { HStack, VStack } from '@common/mui-stacks.tsx';
import TagTagForm from '@pages/telemetry-viewer-page/features/dialogs/tag-editor-dialog/parts/TagTagForm.tsx';
import TagRuleList from '@pages/telemetry-viewer-page/features/dialogs/tag-editor-dialog/parts/TagRuleList.tsx';
import TagRuleEditor from '@pages/telemetry-viewer-page/features/dialogs/tag-editor-dialog/features/TagRuleEditor.tsx';
import actionSetIsTagEditorDialogOpen from '@pages/telemetry-viewer-page/store/settings-store/actions/actionSetIsTagEditorDialogOpen.ts';
import actionUpdateTagConfig from '@pages/telemetry-viewer-page/store/settings-store/actions/actionUpdateTagConfig.ts';
import actionDeleteTagConfig from '@pages/telemetry-viewer-page/store/settings-store/actions/actionDeleteTagConfig.ts';
import { useConfirm } from 'material-ui-confirm';
import actionRecalculateTags from '@pages/telemetry-viewer-page/store/event-store/actions/actionRecalculateTags.ts';
import actionSetTagKeyForEdit from '@pages/telemetry-viewer-page/store/settings-store/actions/actionSetTagKeyForEdit.ts';
import CONST from '@const/CONST.ts';

export default function TagMainEditor() {
  const {
    rules,
    ruleToEdit,
    setRuleToEdit,
    setRules,
    isTagSavable,
    isDefaultTag,
    isNewTag,
    isEdited,
  } = useTagEditorContext();

  // add uuid to each rule clause if it does not have one
  useEffect(() => {
    rules.forEach((rule) => {
      rule.forEach((clause) => {
        if (!clause.uuid) {
          clause.uuid = uuid();
        }
      });
    });
  }, [rules]);

  const confirm = useConfirm();
  const recalculateAllTags = () => {
    actionRecalculateTags();
  };
  const closeEditor = () => {
    actionSetIsTagEditorDialogOpen(false);
  };
  const handleDeleteTag = useRef(async (tagConfig: TagConfig) => {
    try {
      await confirm({
        description: 'This will remove the Tag configuration entirely.',
      });

      actionDeleteTagConfig(tagConfig);

      recalculateAllTags();
      closeEditor();
    } catch (error) {
      console.log(`🐽 no delete... shmart`);
    }
  }).current;
  const handleDuplicateTag = useRef(() => {
    actionSetTagKeyForEdit(CONST.NEW_TAG_KEY);
  }).current;

  const renderInstructions = () => {
    if (isDefaultTag) {
      return renderDefaultTagInstructions();
    } else if (isNewTag) {
      return renderNewTagInstructions();
    } else {
      return renderEditTagInstructions();
    }
  };
  const renderDefaultTagInstructions = () => {
    return (
      <VStack hFill left>
        <Typography sx={{ color: 'warning.main' }}>
          Default Tag: This tag is defined in the product itself. Certain things cannot be
          changed on default tags. This allows any changes of these items in the product
          to still be available at a later time.
        </Typography>
        <Typography sx={{ color: 'warning.main' }}>
          If you would like to make changes to this tag, please duplicate it first.
        </Typography>
      </VStack>
    );
  };
  const renderNewTagInstructions = () => {
    return (
      <VStack hFill left>
        <Typography>
          Excellent! You are creating a new tag. Tags make finding specific events much
          easier. In our experience, shorter tag names are better. They are easier to make
          sense of at a glance.
        </Typography>
      </VStack>
    );
  };
  const renderEditTagInstructions = () => {
    return (
      <VStack hFill left>
        <Typography>
          Change anything you like. Personal tags like this one allow you to edit all
          fields, all the time.
        </Typography>
      </VStack>
    );
  };

  const isRuleEditorOpen = !!ruleToEdit;
  const isSaveDisabled = !isTagSavable || !isEdited;
  const isDuplicateDisabled = isNewTag || isEdited; // only allow duplicate if not new and edited

  return (
    <VStack hFill>
      <DialogContent>
        <VStack hFill left sx={{ opacity: isRuleEditorOpen ? 0.3 : 1.0, p: 3 }}>
          <Typography variant={'h5'}>Tag Editor</Typography>
          <VStack hFill left>
            {renderInstructions()}
            {/*
             _______ _______ _______      _______ _______ ______ _______
            |_     _|   _   |     __|    |    ___|       |   __ \   |   |
              |   | |       |    |  |    |    ___|   -   |      <       |
              |___| |___|___|_______|    |___|   |_______|___|__|__|_|__|
             */}
            <HStack hFill left>
              <TagTagForm />
            </HStack>

            {/*
             ______ _______ _____   _______      _____   _______ _______ _______
            |   __ \   |   |     |_|    ___|    |     |_|_     _|     __|_     _|
            |      <   |   |       |    ___|    |       |_|   |_|__     | |   |
            |___|__|_______|_______|_______|    |_______|_______|_______| |___|
             */}
            <VStack hFill topLeft spacing={1} sx={{ mt: 5 }}>
              <Typography sx={{ fontWeight: 'bold' }}>Match Rules</Typography>
              <TagRuleList />
            </VStack>
          </VStack>

          {/*
           _______ ______ _______ _______ _______ _______      ______ _______ _______ _______ _______ _______ _______
          |   _   |      |_     _|_     _|       |    |  |    |   __ \   |   |_     _|_     _|       |    |  |     __|
          |       |   ---| |   |  _|   |_|   -   |       |    |   __ <   |   | |   |   |   | |   -   |       |__     |
          |___|___|______| |___| |_______|_______|__|____|    |______/_______| |___|   |___| |_______|__|____|_______|
           */}
          <HStack hFill right>
            <TagEditorActionButtons
              saveLabel={'Save Tag'}
              deleteLabel={'Delete Tag'}
              saveDisabled={isSaveDisabled}
              deleteDisabled={isNewTag || isDefaultTag}
              duplicateDisabled={isDuplicateDisabled}
              onCancel={() => {
                actionSetIsTagEditorDialogOpen(false);
              }}
              onSave={(tagConfig: TagConfig) => {
                actionUpdateTagConfig(tagConfig);
                recalculateAllTags();
                closeEditor();
              }}
              onDelete={(tagConfig: TagConfig) => {
                handleDeleteTag(tagConfig).catch(console.error);
              }}
              onDuplicate={() => {
                handleDuplicateTag();
              }}
            />
          </HStack>
        </VStack>
      </DialogContent>

      {/*
           ______ _______ _____   _______      _______ _____ _______ _______ _______ ______
          |   __ \   |   |     |_|    ___|    |    ___|     \_     _|_     _|       |   __ \
          |      <   |   |       |    ___|    |    ___|  --  ||   |_  |   | |   -   |      <
          |___|__|_______|_______|_______|    |_______|_____/_______| |___| |_______|___|__|

          only showing in edit mode for a rule
      */}
      {isRuleEditorOpen && (
        <VStack hFill left>
          <TagRuleEditor
            rule={ruleToEdit}
            isEditable={!isDefaultTag}
            onSave={(rule: TagMatchRule) => {
              // if this rule is not in our list of rules (was
              // created in the editor), then add it to the list of rules
              const existingRule = !!rules.find((r) => r === rule);

              if (!existingRule) {
                rules.push(rule);
              }

              setRules([...rules]);

              setRuleToEdit(null); // close editor
            }}
          />
        </VStack>
      )}
    </VStack>
  );
}

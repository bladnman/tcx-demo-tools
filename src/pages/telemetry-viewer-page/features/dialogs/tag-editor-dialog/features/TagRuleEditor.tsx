import React, { useCallback } from 'react';
import { Box, Button, Divider, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import { useTagEditorContext } from '@pages/telemetry-viewer-page/features/dialogs/tag-editor-dialog/hooks/useTagEditorContext.ts';
import { cloneRule } from '@pages/telemetry-viewer-page/features/dialogs/tag-editor-dialog/utils/cloneRule.ts';
import { HStack, VStack } from '@common/mui-stacks.tsx';
import { getNewTagMatchClause } from '@pages/telemetry-viewer-page/features/dialogs/tag-editor-dialog/utils/getNewTagMatchClause.ts';
import RuleClauseForm from '@pages/telemetry-viewer-page/features/dialogs/tag-editor-dialog/parts/RuleClauseForm.tsx';
import TagEditorActionButtons from '@pages/telemetry-viewer-page/features/dialogs/tag-editor-dialog/parts/TagEditorActionButtons.tsx';

type Props = {
  rule: TagMatchRule;
  onSave: (rule: TagMatchRule) => void;
  isEditable?: boolean;
};
export default function TagRuleEditor({ rule, onSave }: Props) {
  const editorCtx = useTagEditorContext();
  const { setRuleToEdit } = editorCtx;
  const [localRule, setLocalRule] = React.useState<TagMatchRule>(cloneRule(rule));

  //
  // H A N D L E R S
  const handleClauseChange = useCallback(() => {
    console.log(`[🐽](TagRuleEditor) localRule`, localRule);
  }, [localRule]);
  const handleClauseDelete = useCallback(
    (clause: TagMatchClause) => {
      setLocalRule(localRule.filter((tempClause) => tempClause !== clause));
    },
    [localRule],
  );
  const handleSave = useCallback(() => {
    rule.length = 0; // clear
    rule.push(...localRule); // copy
    onSave(rule);
    console.log(`[🐽](TagRuleEditor) localRule`, localRule);
  }, [localRule, onSave, rule]);
  const handleCancel = useCallback(() => {
    setRuleToEdit(null);
  }, [setRuleToEdit]);
  const handleDelete = useCallback(() => {
    console.log(`[🐽](FlagRuleEditor.tsx) MUST WRTIE handleDelete`);
  }, []);

  if (!rule) {
    console.error('You need to provide a rule to edit.');
    return null;
  }

  return (
    <VStack hFill>
      {/* SEPARATOR AND CLOSE BUTTON */}
      <VStack hFill spacing={0}>
        <Divider sx={{ width: '100%' }} />
        <Box
          sx={{
            width: '100%',
            height: '15px',
            background:
              'linear-gradient(to bottom, rgba(0, 0, 0, .13), rgba(0, 0, 0, 0))',
          }}
        />
      </VStack>

      <VStack hFill>
        {/* TITLE */}
        <HStack hFill spaceBetween sx={{ px: 3 }}>
          <Typography variant={'h5'}>Rule Editor</Typography>

          <Box>
            <Button startIcon={<CloseIcon />} onClick={handleCancel} />
          </Box>
        </HStack>

        {/* INSTRUCTIONS */}
        <VStack hFill left sx={{ px: 3 }}>
          <Typography>
            <Typography
              component={'span'}
              sx={{ color: 'appOrange.main', fontWeight: 'bold' }}
            >
              All
            </Typography>{' '}
            of the clauses must be true for the rule to be considered a match.
          </Typography>
          <Typography>
            Rules can be made up of 1 or more clauses. This allows you to create very
            complex rules.
          </Typography>

          {/* CLAUSES */}
          <VStack
            sx={{
              width: '100%',
              borderRadius: '0.35em',
              backgroundColor: 'bg.main',
              p: 2,
            }}
          >
            <VStack hFill spacing={1}>
              {localRule.map((clause, idx) => {
                return (
                  <VStack hFill left spacing={0.2} key={clause.uuid ?? idx}>
                    <Typography variant="caption" sx={{ color: 'fg35.main' }}>
                      Clause {idx + 1}
                    </Typography>
                    <RuleClauseForm
                      clause={clause}
                      deletable={localRule.length > 1}
                      onChange={handleClauseChange}
                      onDelete={handleClauseDelete}
                    />
                  </VStack>
                );
              })}
              <Box>
                <Button
                  variant={'outlined'}
                  startIcon={<AddIcon />}
                  onClick={() => {
                    setLocalRule([...localRule, getNewTagMatchClause()]);
                  }}
                >
                  Add Clause
                </Button>
              </Box>
            </VStack>
          </VStack>
        </VStack>
        {/*   B U T T O N S   */}
        <TagEditorActionButtons
          saveLabel={'Save Rule'}
          deleteLabel={'Delete Rule'}
          deleteDisabled={true}
          onSave={handleSave}
          onCancel={handleCancel}
          onDelete={handleDelete}
        />
      </VStack>
    </VStack>
  );
}

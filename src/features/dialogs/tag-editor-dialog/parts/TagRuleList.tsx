import { Button, IconButton, Tooltip, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useTagEditorContext } from '@dialogs/tag-editor-dialog/hooks/useTagEditorContext.ts';
import { HStack, VStack } from '@common/mui-stacks.tsx';
import TagRuleRow from '@dialogs/tag-editor-dialog/parts/TagRuleRow.tsx';
import { getNewTagMatchClause } from '@dialogs/tag-editor-dialog/utils/getNewTagMatchClause.ts';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function TagRuleList() {
  const editorCtx = useTagEditorContext();
  const { rules, setRuleToEdit, setRules, isDefaultTag } = editorCtx;

  const isEditable = !isDefaultTag;
  return (
    <VStack hFill left spacing={0}>
      <Typography>
        If{' '}
        <Typography
          component={'span'}
          sx={{ color: 'appOrange.main', fontWeight: 'bold' }}
        >
          Any
        </Typography>{' '}
        rule matches, the tag will be "matched".
      </Typography>
      {rules.length === 0 && (
        <Typography variant="body1" sx={{ color: 'warning.main' }}>
          You must have at least 1 rule for a tag.
        </Typography>
      )}
      {rules.map((rule: TagMatchRule, idx: number) => {
        return (
          <VStack
            hFill
            left
            key={idx}
            sx={{
              mt: 2,
              p: 1,
              backgroundColor: 'bg.main',
              borderColor: 'bg.main',
              borderStyle: 'solid',
              borderWidth: '1px',
              borderRadius: '4px',
            }}
          >
            <HStack hFill left spaceBetween>
              <Typography variant="caption" sx={{ color: 'fg35.main' }}>
                Rule {idx + 1}
              </Typography>
              {rule.length > 1 && (
                <Typography variant="caption" sx={{ color: 'appOrange.dark' }}>
                  All clauses must match for rule to match.
                </Typography>
              )}
              <HStack left sx={{ pr: 2 }} spacing={1}>
                <Tooltip title={'Edit rule'}>
                  <>
                    <IconButton
                      disabled={!isEditable}
                      onClick={(event) => {
                        event.stopPropagation();
                        setRuleToEdit(rule);
                      }}
                      color={'primary'}
                      sx={{
                        height: '0.75em',
                        width: '0.75em',
                        opacity: isEditable ? 1.0 : 0.5,
                      }}
                    >
                      <EditIcon fontSize={'small'} />
                    </IconButton>
                  </>
                </Tooltip>

                <Tooltip title={'Delete rule'}>
                  <>
                    <IconButton
                      disabled={!isEditable}
                      onClick={(event) => {
                        event.stopPropagation();
                        setRules(rules.filter((tempRule) => tempRule !== rule));
                      }}
                      sx={{ height: '0.75em', width: '0.75em', opacity: 0.5 }}
                    >
                      <DeleteIcon fontSize={'small'} />
                    </IconButton>
                  </>
                </Tooltip>
              </HStack>
            </HStack>
            <TagRuleRow rule={rule} />
          </VStack>
        );
      })}

      <HStack sx={{ mt: 2 }}>
        <Button
          variant={rules.length < 1 ? 'contained' : 'outlined'}
          startIcon={<AddIcon />}
          onClick={() => {
            setRuleToEdit([getNewTagMatchClause()]);
          }}
          disabled={isDefaultTag}
        >
          New Rule
        </Button>
      </HStack>
    </VStack>
  );
}

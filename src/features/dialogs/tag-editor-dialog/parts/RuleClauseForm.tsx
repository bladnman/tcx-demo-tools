import {
  Autocomplete,
  IconButton,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import React from 'react';
import {
  EqualIcon,
  EqualNotIcon,
  SimilarIcon,
  SimilarNotIcon,
} from '@assets/icons/AppIcons';
import DeleteIcon from '@mui/icons-material/Delete';
import { HStack, VStack } from '@common/mui-stacks.tsx';
import { IMPLY_FIELDS } from '@const/IMPLY_FIELDS.ts';

type Props = {
  onChange?: (clause: TagMatchClause) => void;
  onDelete?: (clause: TagMatchClause) => void;
  deletable?: boolean;
  clause: TagMatchClause;
};
export default function RuleClauseForm({ onDelete, deletable, onChange, clause }: Props) {
  const [path, setPath] = React.useState(clause.path);
  const [mode, setMode] = React.useState(clause.mode);
  const [value, setValue] = React.useState(clause.value);

  const handleChanges = (newValue: string) => {
    const path = newValue as string;
    setPath(path);
    clause.path = path;
    onChange && onChange(clause);
  };

  console.log(`[🐽](RuleClauseForm) path`, path);

  return (
    <HStack
      spacing={2}
      hFill
      sx={{
        borderBottomStyle: 'solid',
        borderBottomColor: 'fg25.main',
        borderBottomSize: '1px',
        paddingBottom: 2,
      }}
    >
      {/* FIELD */}
      <Autocomplete
        value={path}
        options={IMPLY_FIELDS}
        disableClearable
        freeSolo
        renderInput={(params) => (
          <TextField
            {...params}
            label="Path"
            variant="standard"
            sx={{ minWidth: '13em', flexGrow: 1 }}
          />
        )}
        onChange={(_event, newValue) => {
          handleChanges(newValue);
        }}
        onInputChange={(_event, newValue) => {
          handleChanges(newValue);
        }}
        fullWidth
      />

      {/* MODE */}
      <VStack spacing={0}>
        <Typography variant={'caption'} sx={{ color: 'appOrange.dark' }}>
          {mode}
        </Typography>
        <ToggleButtonGroup
          value={mode}
          exclusive
          size={'small'}
          color={'primary'}
          onChange={(_event, newMode) => {
            newMode && setMode(newMode);
            clause.mode = newMode;
            onChange && onChange(clause);
          }}
        >
          <ToggleButton value="EQUALS">
            <EqualIcon height={20} />
          </ToggleButton>
          <ToggleButton value="NOT_EQUALS">
            <EqualNotIcon height={20} />
          </ToggleButton>
          <ToggleButton value="CONTAINS">
            <SimilarIcon height={20} />
          </ToggleButton>
          <ToggleButton value="NOT_CONTAINS">
            <SimilarNotIcon height={20} />
          </ToggleButton>
        </ToggleButtonGroup>
      </VStack>

      {/*  VALUE */}
      <TextField
        value={value}
        label="Value"
        variant="standard"
        error={!value || value.length < 1}
        fullWidth
        onChange={(event) => {
          const value = event.target.value;
          setValue(value);
          clause.value = value;
          onChange && onChange(clause);
        }}
      />
      {deletable && (
        <IconButton onClick={() => onDelete && onDelete(clause)}>
          {/*@ts-expect-error : using my own colors*/}
          <DeleteIcon color={'fg50'} />
        </IconButton>
      )}
    </HStack>
  );
}

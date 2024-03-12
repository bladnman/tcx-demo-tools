import { Autocomplete, TextField } from '@mui/material';
import React from 'react';
import { EVENT_TYPES } from '@pages/telemetry-viewer-page/types/event-types.ts';

export default function EventTypeAutocomplete({
  placeholder,
  onChange,
  eventCodeFilter,
  label,
}: {
  onChange: (value: string[]) => void;
  eventCodeFilter?: string[];
  placeholder?: string;
  label?: string;
}) {
  return (
    <Autocomplete
      multiple
      limitTags={2}
      id="multiple-limit-tags"
      options={EVENT_TYPES}
      getOptionLabel={(option) => option}
      value={eventCodeFilter}
      onChange={(
        _event: React.SyntheticEvent<Element, Event>,
        value: string[],
      ) => {
        onChange(value);
      }}
      renderInput={(params) => (
        <TextField {...params} label={label} placeholder={placeholder} />
      )}
      sx={{ width: '500px' }}
    />
  );
}

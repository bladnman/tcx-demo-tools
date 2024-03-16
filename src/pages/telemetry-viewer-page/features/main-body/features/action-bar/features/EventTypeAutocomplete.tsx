import { Autocomplete, TextField } from '@mui/material';
import React from 'react';
import { EVENT_TYPES } from '@pages/telemetry-viewer-page/types/event-types.ts';
import useFilter from '@pages/telemetry-viewer-page/hooks/useFilter.ts';

export default function EventTypeAutocomplete() {
  const [eventTypeFilter, setActiveFilterValues] = useFilter('type');

  return (
    <Autocomplete
      multiple
      limitTags={2}
      id="multiple-limit-tags"
      options={EVENT_TYPES}
      getOptionLabel={(option) => option}
      value={eventTypeFilter.activeValues}
      onChange={(
        _event: React.SyntheticEvent<Element, Event>,
        values: string[],
      ) => {
        setActiveFilterValues(values);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={'Event Type Filter'}
          placeholder={
            eventTypeFilter.anyActive ? 'Filtered to' : 'No type filter'
          }
        />
      )}
      sx={{
        // maxWidth: '500px',
        minWidth: '150px',
        width: '100%',
        flexShrink: 1,
      }}
    />
  );
}

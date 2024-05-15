import TelemetryFilter from '@classes/TelemetryFilter.ts';
import { HStack } from '@common/mui-stacks.tsx';
import { getFieldDef } from '@const/FIELD_DEF.ts';
import AddIcon from '@mui/icons-material/Add';
import {
  Button,
  Checkbox,
  ListItemText,
  Menu,
  MenuItem,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import useFilterOptions from '@features/sidebar-panel/features/filters-action-bar/hooks/useFilterOptions.ts';
import actionClearFilters from '@store/event-store/actions/actionClearFilters.ts';
import actionRecalculateFilters from '@store/event-store/actions/actionRecalculateFilters.ts';
import actionSetFilterMode from '@store/event-store/actions/actionSetFilterMode.ts';
import actionSetFilters from '@store/event-store/actions/actionSetFilters.ts';
import { useFilters } from '@store/event-store/useEventStore.ts';
import useSettingsStore from '@store/settings-store/useSettingsStore.ts';
import populateFiltersWithAllEvents from '@utils/filter-utils/populateFiltersWithAllEvents.ts';
import React, { useState } from 'react';

export default function FilterActionBar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const filterOptions = useFilterOptions();
  const filters = useFilters();
  const filterMode = useSettingsStore((state) => state.filterMode);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFilterItemToggle = (field: string) => {
    const thisFilter = filters.find((f) => f.field === field);

    // ADD
    if (!thisFilter) {
      const filterDef = getFieldDef(field);
      if (!filterDef) return;
      const newFilter = new TelemetryFilter(filterDef);
      newFilter.collapsed = false;

      // populate the filter with all events
      populateFiltersWithAllEvents([newFilter]);

      actionSetFilters([...filters, newFilter]);
    }

    // REMOVE
    else {
      actionSetFilters(filters.filter((f) => f.field !== field));

      // if filter being removed has any active items,
      // we need to recalculate filters
      if (thisFilter.anyActive) actionRecalculateFilters();
    }
  };

  return (
    <HStack hFill left spaceBetween>
      <Button aria-controls="checkable-menu" aria-haspopup="true" onClick={handleClick}>
        <AddIcon />
      </Button>

      <ToggleButtonGroup
        value={filterMode}
        exclusive
        size={'small'}
        color={'primary'}
        onChange={(_event, newMode) => {
          if (newMode !== 'AND' && newMode !== 'OR') return;
          actionSetFilterMode(newMode);
          actionRecalculateFilters();
        }}
        sx={{ height: '1.5em' }}
      >
        <ToggleButton value="AND">AND</ToggleButton>
        <ToggleButton value="OR">OR</ToggleButton>
      </ToggleButtonGroup>

      <Button
        onClick={() => {
          actionSetFilterMode('AND');
          actionClearFilters();
          actionRecalculateFilters();
        }}
      >
        Clear All
      </Button>
      <Menu
        id="checkable-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {filterOptions
          .sort((lhs: FilterOption, rhs: FilterOption) =>
            lhs.label.localeCompare(rhs.label),
          )
          .map(({ field, label, selected }) => (
            <MenuItem
              key={field}
              onClick={() => handleFilterItemToggle(field)}
              sx={{ py: 0 }}
            >
              <Checkbox
                checked={selected}
                // @ts-expect-error : using my own colors
                color={'appOrange'}
                sx={{ py: '3px' }}
              />
              <ListItemText primary={label} />
            </MenuItem>
          ))}
      </Menu>
    </HStack>
  );
}
type FilterOption = {
  field: string;
  label: string;
  selected: boolean;
};

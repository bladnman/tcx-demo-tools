import {
  Button,
  Checkbox,
  ListItemText,
  Menu,
  MenuItem,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import React, { useState } from 'react';
import useFilterOptions from '@pages/telemetry-viewer-page/features/left-drawer/features/filters-action-bar/hooks/useFilterOptions.ts';
import { getFieldDef } from '@pages/telemetry-viewer-page/constants/FIELD_DEF.ts';
import TelemetryFilter from '@pages/telemetry-viewer-page/classes/TelemetryFilter.ts';
import { useFilters } from '@pages/telemetry-viewer-page/store/event-store/useEventStore.ts';
import actionSetFilters from '@pages/telemetry-viewer-page/store/event-store/actions/actionSetFilters.ts';
import { HStack } from '@common/mui-stacks.tsx';
import useSettingsStore from '@pages/telemetry-viewer-page/store/settings-store/useSettingsStore.ts';
import actionSetFilterMode from '@pages/telemetry-viewer-page/store/event-store/actions/actionSetFilterMode.ts';
import actionRecalculateFilters from '@pages/telemetry-viewer-page/store/event-store/actions/actionRecalculateFilters.ts';
import actionClearFilters from '@pages/telemetry-viewer-page/store/event-store/actions/actionClearFilters.ts';

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

  const handleToggle = (field: string) => {
    const thisFilter = filters.find((f) => f.field === field);

    // ADD
    if (!thisFilter) {
      const filterDef = getFieldDef(field);
      if (!filterDef) return;
      const newFilter = new TelemetryFilter(filterDef);
      newFilter.collapsed = false;
      actionSetFilters([...filters, newFilter]);
    }

    // REMOVE
    else {
      actionSetFilters(filters.filter((f) => f.field !== field));
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
        {filterOptions.map(({ field, label, selected }) => (
          <MenuItem key={field} onClick={() => handleToggle(field)} sx={{ py: 0 }}>
            <Checkbox
              checked={selected}
              // @ts-expect-error : using my own colors
              color={'appOrange'}
            />
            <ListItemText primary={label} />
          </MenuItem>
        ))}
      </Menu>
    </HStack>
  );
}

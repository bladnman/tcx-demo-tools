import { Button, Checkbox, ListItemText, Menu, MenuItem } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import React, { useState } from 'react';
import useFilterOptions from '@pages/telemetry-viewer-page/features/left-drawer/features/filter-action-bar/hooks/useFilterOptions.ts';
import { getFieldDef } from '@pages/telemetry-viewer-page/constants/FIELD_DEF.ts';
import TelemetryFilter from '@pages/telemetry-viewer-page/classes/TelemetryFilter.ts';
import { useFilters } from '@pages/telemetry-viewer-page/store/event-store/useEventStore.ts';
import actionSetFilters from '@pages/telemetry-viewer-page/store/event-store/actions/actionSetFilters.ts';

export default function FilterActionBar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const filterOptions = useFilterOptions();
  const filters = useFilters();

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
    <div>
      <Button
        aria-controls="checkable-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <AddIcon />
      </Button>
      <Menu
        id="checkable-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {filterOptions.map(({ field, label, selected }) => (
          <MenuItem
            key={field}
            onClick={() => handleToggle(field)}
            sx={{ py: 0 }}
          >
            <Checkbox
              checked={selected}
              // @ts-expect-error : using my own colors
              color={'appOrange'}
            />
            <ListItemText primary={label} />
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

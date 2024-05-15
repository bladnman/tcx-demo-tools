import TelemetryFilter from '@classes/TelemetryFilter.ts';
import { HStack } from '@common/mui-stacks.tsx';
import { Menu, MenuItem, Typography } from '@mui/material';
import actionRecalculateFilters from '@store/event-store/actions/actionRecalculateFilters.ts';
import React, { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
export default function FGActionBarEventType({ filter }: { filter: TelemetryFilter }) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const filterType = filter.type as string;
  if (filterType !== 'eventType' && filterType !== 'type') return null;
  if (filter.items.length < 2) return null;

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const setMainClientEvents = () => {
    const types = [
      'Interaction',
      'Navigation',
      'ViewableImpression',
      'NetworkError',
      'ApplicationError',
      'LoadTime',
    ];
    filter.items.forEach((item) => {
      item.active = types.includes(item.value as string);
    });
    actionRecalculateFilters();
    doCloseMenu();
  };
  const clearAll = () => {
    filter.items.forEach((item) => {
      item.active = false;
    });
    actionRecalculateFilters();
    doCloseMenu();
  };
  const doCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <HStack hFill right spacing={0}>
        <HStack spacing={0} onClick={handleClick} sx={{ cursor: 'pointer' }}>
          <Typography variant={'caption'}>Options</Typography>
          <KeyboardArrowDownIcon sx={{ fontSize: '1.3em', paddingBottom: '0.1em' }} />
        </HStack>
      </HStack>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={doCloseMenu}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={clearAll}>Clear</MenuItem>
        <MenuItem onClick={setMainClientEvents}>Main Client Events</MenuItem>
      </Menu>
    </>
  );
}

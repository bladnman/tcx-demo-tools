import React, { useState } from 'react';
import TelemetryMockPublisherReceiverInterface from '@pages/telemetry-viewer-page/features/TelemetryMockPublisherReceiverInterface.tsx';
import TelemetryPublisherReceiverInterface from '@pages/telemetry-viewer-page/features/TelemetryPublisherReceiverInterface.tsx';
import { HStack } from '@common/mui-stacks.tsx';
import {
  Button,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CheckIcon from '@mui/icons-material/Check';
import TelemetryMobileReceiver from '@pages/telemetry-viewer-page/features/TelemetryMobileReceiver.tsx';

// Define the modes as a readonly array of literal types
const modes = ['Mock', 'TD Server', 'Mobile'] as const;

// Derive ModeTypes type from the values of the modes array
type ModeTypes = (typeof modes)[number];
export default function TelemetryPublisherSelector() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mode, setMode] = useState<ModeTypes>('Mock');

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const renderPublisher = () => {
    switch (mode) {
      case 'Mock':
        return <TelemetryMockPublisherReceiverInterface />;
      case 'TD Server':
        return <TelemetryPublisherReceiverInterface />;
      case 'Mobile':
        return <TelemetryMobileReceiver />;
    }
  };

  return (
    <>
      <HStack>
        <Typography>Mode: </Typography>
        <Button onClick={handleClick}>
          {mode}
          <KeyboardArrowDownIcon />
        </Button>
        {renderPublisher()}
      </HStack>

      <Menu
        id="checkable-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {modes.map((value) => (
          <MenuItem
            key={value}
            onClick={() => {
              setMode(value as ModeTypes);
              handleClose();
            }}
            sx={{ py: 0.5 }}
          >
            <HStack>
              <CheckIcon sx={{ opacity: mode === value ? 1 : 0 }} />
              <ListItemText primary={value} />
            </HStack>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

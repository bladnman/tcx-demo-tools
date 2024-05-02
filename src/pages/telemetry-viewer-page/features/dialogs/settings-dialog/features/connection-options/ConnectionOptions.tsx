import { HStack, VStack } from '@common/mui-stacks.tsx';
import {
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import { ChangeEvent, useState } from 'react';
import useSettingsStore from '@pages/telemetry-viewer-page/store/settings-store/useSettingsStore.ts';
import { isValidIP } from '@pages/telemetry-viewer-page/utils/telemetry-utils.ts';
import ConnectionButton from '@pages/telemetry-viewer-page/features/main-body/features/action-bar/features/connect-button/ConnectionButton.tsx';
import actionSetCnxIpAddress from '@pages/telemetry-viewer-page/store/settings-store/actions/actionSetCnxIpAddress.ts';
import actionSetCnxPlatform from '@pages/telemetry-viewer-page/store/settings-store/actions/actionSetCnxPlatform.ts';
import actionSetMockBatchSize from '@pages/telemetry-viewer-page/store/settings-store/actions/actionSetMockBatchSize.ts';
import actionSetIsImportDialogOpen from '@pages/telemetry-viewer-page/store/settings-store/actions/actionSetIsImportDialogOpen.ts';
import actionSetIsSettingsDialogOpen from '@pages/telemetry-viewer-page/store/settings-store/actions/actionSetIsSettingsDialogOpen.ts';
import TagStyleDropbox from '@pages/telemetry-viewer-page/features/dialogs/tag-editor-dialog/parts/TagStyleDropbox.tsx';
import actionSetMockAutoPause from '@pages/telemetry-viewer-page/store/settings-store/actions/actionSetMockAutoPause.ts';

export default function ConnectionOptions() {
  const {
    isConnectedViaTCx,
    connectToTCxName,
    cnxIpAddress,
    cnxPlatform,
    mockBatchSize,
    mockAutoPause,
  } = useSettingsStore();

  const [isFormComplete, setIsFormComplete] = useState(!!cnxIpAddress);
  const handleIpChange = (event: ChangeEvent<HTMLInputElement>) => {
    const ip = event.target.value;
    if (!isValidIP(ip)) {
      setIsFormComplete(false);
    }
    setIsFormComplete(true);
    actionSetCnxIpAddress(ip);
  };
  const handleMockBatchSizeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value ?? 1;
    actionSetMockBatchSize(Number(value));
  };
  const handlePlatformChange = (event: SelectChangeEvent) => {
    actionSetCnxPlatform(event.target.value as ConnectionPlatform);
  };

  const isConnected = isConnectedViaTCx || connectToTCxName === 'Mock';
  const isButtonEnabled = isConnected || isFormComplete;

  return (
    <VStack topLeft>
      <Typography>ConnectionOptions</Typography>
      <HStack>
        <TextField
          label={'IP Address'}
          variant="standard"
          disabled={isConnected}
          value={cnxIpAddress ?? ''}
          onChange={handleIpChange}
        />
        <FormControl disabled={isConnected}>
          <InputLabel htmlFor="platform-input">Platform</InputLabel>
          <Select
            labelId="platform-input"
            value={cnxPlatform}
            variant="standard"
            onChange={handlePlatformChange}
            sx={{ minWidth: '7em' }}
          >
            <MenuItem value={'TD Server'}>TD Server</MenuItem>
            <MenuItem value={'Mobile'}>Mobile</MenuItem>
            <MenuItem value={'Mock'}>Mock</MenuItem>
          </Select>
        </FormControl>
        {cnxPlatform === 'Mock' && (
          <>
            <TextField
              label={'Batch Size'}
              variant="standard"
              value={mockBatchSize ?? ''}
              onChange={handleMockBatchSizeChange}
              sx={{ width: '7em' }}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={mockAutoPause}
                  onChange={() => actionSetMockAutoPause(!mockAutoPause)}
                />
              }
              label="Auto-pause"
            />
          </>
        )}
        <ConnectionButton disabled={!isButtonEnabled} />
      </HStack>
      <VStack sx={{ pt: 5 }}>
        <Button
          onClick={() => {
            actionSetIsSettingsDialogOpen(false);
            actionSetIsImportDialogOpen(true);
          }}
        >
          Import from file ...
        </Button>

        <TagStyleDropbox tagIcon={'🔫'} tagKey={'our favorite item'} />
      </VStack>
    </VStack>
  );
}

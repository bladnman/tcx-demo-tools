import { HStack, VStack } from '@common/mui-stacks.tsx';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import useSettingsStore from '@pages/telemetry-viewer-page/store/settings-store/useSettingsStore.ts';
import { isValidIP } from '@pages/telemetry-viewer-page/utils/telemetry-utils.ts';
import ConnectionButton from '@pages/telemetry-viewer-page/features/main-body/features/action-bar/features/ConnectionButton.tsx';
import actionSetCnxIpAddress from '@pages/telemetry-viewer-page/store/settings-store/actions/actionSetCnxIpAddress.ts';
import actionSetCnxPlatform from '@pages/telemetry-viewer-page/store/settings-store/actions/actionSetCnxPlatform.ts';

export default function ConnectionOptions() {
  const { isConnectedViaTCx, connectToTCxName, cnxIpAddress, cnxPlatform } = useSettingsStore();

  const [isFormComplete, setIsFormComplete] = useState(!!cnxIpAddress);
  const handleIpChange = (event: ChangeEvent<HTMLInputElement>) => {
    const ip = event.target.value;
    if (!isValidIP(ip)) {
      setIsFormComplete(false);
    }
    setIsFormComplete(true);
    actionSetCnxIpAddress(ip);
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
        <ConnectionButton disabled={!isButtonEnabled} />
      </HStack>
    </VStack>
  );
}

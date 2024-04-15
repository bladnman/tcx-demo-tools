import { HStack, VStack } from '@common/mui-stacks.tsx';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import { ChangeEvent, useState } from 'react';
import useTelemetryStore from '@pages/telemetry-viewer-page/store/useTelemetryStore.ts';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import { isValidIP } from '@pages/telemetry-viewer-page/utils/telemetry-utils.ts';

export default function ConnectionOptions() {
  const {
    isConnectedViaTCx,
    setConnectToTCxName,
    connectToTCxName,
    cnxIpAddress,
    setCnxIpAddress,
    cnxPlatform,
    setCnxPlatform,
  } = useTelemetryStore();

  const [localIpAddress, setLocalIpAddress] = useState<string | null>(
    cnxIpAddress,
  );
  const [isFormComplete, setIsFormComplete] = useState(!!localIpAddress);
  const handleIpChange = (event: ChangeEvent<HTMLInputElement>) => {
    const ip = event.target.value;
    setLocalIpAddress(ip);
    setIsFormComplete(isValidIP(ip));
  };
  const [localPlatform, setLocalPlatform] =
    useState<ConnectionPlatform>(cnxPlatform);
  const handlePlatformChange = (event: SelectChangeEvent) => {
    setLocalPlatform(event.target.value as ConnectionPlatform);
  };

  const isConnected = isConnectedViaTCx || connectToTCxName === 'Mock';
  const buttonIcon = isConnected ? <StopIcon /> : <PlayArrowIcon />;
  const buttonColor = isConnected ? 'appRed' : 'appGreen';
  const isButtonEnabled = isConnected || isFormComplete;
  const handleConnectPressed = () => {
    // DISCONNECT
    if (isConnected) {
      setConnectToTCxName(null);
    }

    // CONNECT
    else if (isValidIP(localIpAddress)) {
      setCnxIpAddress(localIpAddress);
      setCnxPlatform(localPlatform);

      // const connectToName = `${localPlatform}_${localIpAddress}_TelemetryPublisher`;
      const connectToName =
        localPlatform === 'TD Server'
          ? 'TDServer'
          : localPlatform === 'Mobile'
            ? 'MobileTelemetry'
            : 'Mock';

      setConnectToTCxName(connectToName);
    }
  };

  return (
    <VStack topLeft>
      <Typography>ConnectionOptions</Typography>
      <HStack>
        <TextField
          label={'IP Address'}
          variant="standard"
          disabled={isConnected}
          value={localIpAddress ?? ''}
          onChange={handleIpChange}
        />
        <FormControl disabled={isConnected}>
          <InputLabel htmlFor="platform-input">Platform</InputLabel>
          <Select
            labelId="platform-input"
            value={localPlatform}
            variant="standard"
            onChange={handlePlatformChange}
            sx={{ minWidth: '7em' }}
          >
            <MenuItem value={'TD Server'}>TD Server</MenuItem>
            <MenuItem value={'Mobile'}>Mobile</MenuItem>
            <MenuItem value={'Mock'}>Mock</MenuItem>
          </Select>
        </FormControl>
        <Button
          disabled={!isButtonEnabled}
          onClick={handleConnectPressed}
          variant={'contained'}
          // @ts-expect-error : using my own colors
          color={buttonColor}
        >
          {buttonIcon}
        </Button>
      </HStack>
    </VStack>
  );
}

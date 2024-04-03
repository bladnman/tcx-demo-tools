import { HStack, VStack } from '@common/mui-stacks.tsx';
import { Button, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CableIcon from '@mui/icons-material/Cable';
import { useCallback } from 'react';
import { useTCx } from '@tcx-hosted/tcx-react';
import { TcxSS_CONFIG } from '@tcx-hosted/tcx-react/hooks/useTCx.ts';

export default function Tcx2Initiator2({ tcxName }: { tcxName: string }) {
  const onData = useCallback(
    (data: unknown) => {
      console.log(`[${tcxName}] received:`, data);
    },
    [tcxName],
  );

  const tcx = useTCx(tcxName, TcxSS_CONFIG, onData);

  const handleClose = () => {
    tcx.disconnect();
  };
  const handleCloseDataChannel = () => {
    tcx.closeDataChannel();
  };
  const handleRegister = () => {
    tcx.register().catch((e) => {
      console.error('Failed to register', e);
    });
  };
  const handleConnectTo = (name: string) => {
    tcx.connectTo(name).catch((e) => {
      console.error('Failed to connect to', name, e);
    });
  };
  const sendMessage = (message: unknown) => {
    tcx.send(message);
  };
  const renderRow = (label: string, value: string) => (
    <HStack>
      <Typography>{label}:</Typography>
      <Typography>{value}</Typography>
    </HStack>
  );
  return (
    <VStack fill>
      <HStack
        spacing={0}
        hFill
        sx={{
          backgroundColor: 'paper.main',
        }}
      >
        <Button onClick={handleRegister}>
          <CableIcon />
        </Button>
        <Button onClick={handleClose}>
          <CloseIcon />
        </Button>
        <Button onClick={handleCloseDataChannel}>🔫</Button>
        <HStack spacing={0} sx={{ pl: 4 }}>
          <Typography>connect to:</Typography>
          <Button onClick={() => handleConnectTo('bob')}>bob</Button>
          <Button onClick={() => handleConnectTo('sally')}>sally</Button>
          <Button onClick={() => handleConnectTo('jim')}>jim</Button>
          <Button onClick={() => handleConnectTo('TDServer')}>TDServer</Button>
        </HStack>
        <Button
          onClick={() => {
            sendMessage('👋 hi there');
          }}
        >
          👋
        </Button>
        <Button
          onClick={() => {
            sendMessage({
              message: '📦 you got mail!',
            });
          }}
        >
          📦
        </Button>
      </HStack>

      <VStack
        vFill
        sx={{
          opacity: tcx.isConnectedToSignalServer ? 1 : 0.5,
        }}
      >
        <Typography variant={'h4'}>{tcxName}</Typography>

        {renderRow(
          'connected to signal server',
          tcx.isConnectedToSignalServer ? 'true' : 'false',
        )}
        {renderRow(
          'connected to peer',
          tcx.isConnectedToPeer ? 'true' : 'false',
        )}
      </VStack>
    </VStack>
  );
}

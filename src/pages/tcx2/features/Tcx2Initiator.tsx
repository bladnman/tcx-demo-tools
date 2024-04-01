import { HStack, VStack } from '@common/mui-stacks.tsx';
import { Button, Typography } from '@mui/material';
import useTCxSM from '@pages/tcx2/hooks/useTCxSM.ts';
import CloseIcon from '@mui/icons-material/Close';
import CableIcon from '@mui/icons-material/Cable';
import useRtc from '@pages/tcx2/hooks/useRtc.ts';
import { useEffect, useMemo, useState } from 'react';
import useTCx2 from '@pages/tcx2/hooks/useTCx2.ts';

export default function Tcx2Initiator({ tcxName }: { tcxName: string }) {
  const tcx = useTCx2();
  const tcxSM = useTCxSM({ tcxName });

  const [targetTcxName, setTargetTcxName] = useState<string | null>(null);

  const onicecandidate = useMemo(() => {
    return (event: RTCPeerConnectionIceEvent) => {
      if (targetTcxName && event.candidate) {
        console.log(`🛜 [${tcxName}] ICE Candidate:`, event.candidate);
        tcxSM.send({
          type: 'new-ice-candidate',
          candidate: event.candidate,
          targetTcxName,
        });
      }
    };
  }, [tcxName, targetTcxName, tcxSM]);
  const onmessage = useMemo(() => {
    return (event: MessageEvent) => {
      console.log(`🛜 [${tcxName}] DataChannel Data:`, event.data);
    };
  }, [tcxName, tcxSM]);
  const onopen = useMemo(() => {
    return (event: Event) => {
      console.log(`🛜 [${tcxName}] DataChannel Connected`, event);
    };
  }, [tcxName, tcxSM]);
  const onclose = useMemo(() => {
    return (event: Event) => {
      console.log(`🛜 [${tcxName}] DataChannel Disconnected`, event);
    };
  }, [tcxName, tcxSM]);

  const rtcHandlers = useMemo(() => {
    return {
      onicecandidate,
      onmessage,
      onopen,
      onclose,
    };
  }, [onicecandidate, onmessage, onopen, onclose]);

  const { peerConnection, dataChannel } = useRtc(rtcHandlers);

  const handleConnectTo = (targetTcxName: string) => {
    setTargetTcxName(targetTcxName);
  };

  useEffect(() => {
    if (targetTcxName) {
      peerConnection.createOffer().then((offer) => {
        peerConnection.setLocalDescription(offer).then(() => {
          tcxSM.send({ type: 'offer', offer, targetTcxName });
        });
      });
    }
  }, [targetTcxName, peerConnection, tcxSM]);

  const handleClose = () => {
    tcxSM.disconnect();
  };
  const handleConnect = () => {
    tcxSM.connect();
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
        <Button onClick={handleConnect}>
          <CableIcon />
        </Button>
        <Button onClick={handleClose}>
          <CloseIcon />
        </Button>
        <HStack spacing={0} sx={{ pl: 4 }}>
          <Typography>connect to:</Typography>
          <Button onClick={() => handleConnectTo('bob')}>bob</Button>
          <Button onClick={() => handleConnectTo('sally')}>sally</Button>
          <Button onClick={() => handleConnectTo('jim')}>jim</Button>
        </HStack>
      </HStack>

      <VStack
        vFill
        sx={{
          opacity: tcxSM.isConnected ? 1 : 0.5,
        }}
      >
        <Typography variant={'h4'}>{tcxName}</Typography>

        {renderRow('connected', tcxSM.isConnected ? 'true' : 'false')}
      </VStack>
    </VStack>
  );
}

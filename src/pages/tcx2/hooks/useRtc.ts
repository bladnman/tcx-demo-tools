import { useMemo } from 'react';

export interface RtcHandlers {
  onicecandidate: (event: RTCPeerConnectionIceEvent) => void;
  onmessage: (event: MessageEvent) => void;
  onopen: (event: Event) => void;
  onclose: (event: Event) => void;
}

export default function useRtc(rtcHandlers: RtcHandlers) {
  return useMemo(() => {
    const peerConnection = new RTCPeerConnection();
    const dataChannel = peerConnection.createDataChannel('dataChannel');

    peerConnection.onicecandidate = rtcHandlers.onicecandidate;

    dataChannel.onmessage = rtcHandlers.onmessage;
    dataChannel.onopen = rtcHandlers.onopen;
    dataChannel.onclose = rtcHandlers.onclose;

    return { peerConnection, dataChannel };
  }, [rtcHandlers]);
}

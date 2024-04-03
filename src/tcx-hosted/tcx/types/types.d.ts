declare namespace TCxRTC {
  interface RTCDataChannel {
    readonly label: string;
    readonly id: number;
    readonly readyState: RTCDataChannelState;
    onmessage: (event: MessageEvent) => void;
    onopen: () => void;
    onclose: () => void;
    send(data: string | ArrayBuffer | Blob): void;
    close(): void;
  }
  type RTCDataChannelState = 'connecting' | 'open' | 'closing' | 'closed';

  interface IRTCIceCandidate {
    candidate: string;
    sdpMLineIndex: number;
    sdpMid: string | null;
  }

  // RTCPeerConnection
  interface IRTCPeerConnection {
    createOffer(options?: RTCOfferOptions): Promise<RTCSessionDescriptionInit>;
    createAnswer(
      options?: RTCAnswerOptions,
    ): Promise<RTCSessionDescriptionInit>;
    setLocalDescription(description: RTCSessionDescriptionInit): Promise<void>;
    setRemoteDescription(description: RTCSessionDescriptionInit): Promise<void>;
    addIceCandidate(candidate: RTCIceCandidateInit): Promise<void>;
    onicecandidate: (event: RTCPeerConnectionIceEvent) => void;
    ontrack: (event: RTCTrackEvent) => void;
    addTrack(track: MediaStreamTrack, ...streams: MediaStream[]): RTCRtpSender;
    close(): void;
    createDataChannel(
      label: string,
      dataChannelDict?: RTCDataChannelInit,
    ): RTCDataChannel;
    ondatachannel: (event: RTCDataChannelEvent) => void;
    readonly signalingState: RTCSignalingState;
  }
  interface IRTCPeerConnectionConstructor {
    new (configuration?: RTCConfiguration): IRTCPeerConnection;
  }

  interface RTCDataChannelInit {
    ordered?: boolean;
    maxPacketLifeTime?: number;
    maxRetransmits?: number;
    protocol?: string;
    negotiated?: boolean;
    id?: number;
    priority?: RTCPriorityType;
  }

  interface RTCDataChannelEvent extends Event {
    readonly channel: RTCDataChannel;
  }

  type RTCSignalingState =
    | 'stable'
    | 'have-local-offer'
    | 'have-remote-offer'
    | 'have-local-pranswer'
    | 'have-remote-pranswer'
    | 'closed';

  type RTCPriorityType = 'very-low' | 'low' | 'medium' | 'high';

  // RTCIceCandidate
  interface RTCIceCandidate {
    readonly candidate: string;
    readonly sdpMid: string | null;
    readonly sdpMLineIndex: number | null;

    toJSON(): unknown;
  }

  // Supporting types
  type RTCOfferOptions = {
    offerToReceiveAudio?: boolean;
    offerToReceiveVideo?: boolean;
    // Add other WebRTC offer options as needed
  };
  type RTCAnswerOptions = {
    // Define answer options if needed
  };
  type RTCPeerConnectionIceEvent = {
    candidate: RTCIceCandidate | null;
  };
  type RTCTrackEvent = {
    tracks: MediaStreamTrack[];
  };
  type RTCRtpSender = {
    // Define RTP sender properties and methods if needed
  };
  type MediaStreamTrack = {
    // Define media stream track properties and methods if needed
  };
  type MediaStream = {
    // Define media stream properties and methods if needed
  };
}

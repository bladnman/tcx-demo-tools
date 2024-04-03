import TCxSignalServerManager, {
  IWebSocketConstructor,
  IWSCustomEvent,
  TCxSSEvents,
  TCxSSOptions,
} from './TCxSignalServerManager';

interface IRTCSessionDescriptionInit {
  type: 'offer' | 'pranswer' | 'answer' | 'rollback';
  sdp?: string;
}

export default class TCxConnectionManager {
  private readonly WS: IWebSocketConstructor;
  private readonly RTC: TCxRTC.IRTCPeerConnectionConstructor;
  private signalServer?: TCxSignalServerManager;
  private readonly tcxName: string;
  private readonly ssOptions: TCxSSOptions;
  private readonly onStateChange: () => void;
  private peerConnection?: TCxRTC.IRTCPeerConnection;
  private dataChannel?: TCxRTC.RTCDataChannel;
  private targetTcxName?: string;
  private unsentCandidates: (TCxRTC.IRTCIceCandidate | null)[] = [];
  private readonly onData: (data: unknown) => void;

  get isConnectedToSignalServer(): boolean {
    return this.signalServer?.isConnected ?? false;
  }
  get isConnectedToPeer(): boolean {
    return this.dataChannel?.readyState === 'open' ?? false;
  }

  get isDebug(): boolean {
    return this.ssOptions.debug;
  }

  constructor(
    tcxName: string,
    WS: IWebSocketConstructor,
    RTC: TCxRTC.IRTCPeerConnectionConstructor,
    signalManagerOptions: TCxSSOptions,
    onStateChange: () => void,
    onData: (data: unknown) => void,
  ) {
    this.WS = WS;
    this.RTC = RTC;
    this.tcxName = tcxName;
    this.onStateChange = onStateChange;
    this.ssOptions = signalManagerOptions;
    this.onData = onData;
  }

  registerWithSignalServer(): Promise<void> {
    // already registered
    if (this.signalServer?.isConnected) return Promise.resolve();

    this.signalServer = new TCxSignalServerManager(
      this.tcxName,
      this.ssEventHandlers,
      this.ssOptions,
    );

    // connect to the signal server
    // event handlers take care of the rest
    return this.signalServer.connect(this.WS);
  }

  connectTo(targetTcxName: string): void {
    if (targetTcxName) {
      this.targetTcxName = targetTcxName;
      this.isDebug &&
        console.log(
          `🔩👉💌 [${this.tcxName}] Sending an offer to: ${targetTcxName}`,
        );
      this.createPeerConnection();
      const peerConnection = this.peerConnection;

      // do we create this now (need to keep track of un sent candidates, if so)
      this.createDataChannel();

      if (!peerConnection) {
        console.error(
          `🔩❌ [${this.tcxName}] No peer connection to send offer`,
        );
        return;
      }

      peerConnection.createOffer().then((offer) => {
        peerConnection.setLocalDescription(offer).then(() => {
          const message = {
            type: 'offer',
            offer,
            targetTcxName,
            fromTcxName: this.tcxName,
          };
          this.signalServer?.connection?.send(JSON.stringify(message));
        });
      });
    }
  }
  send(data: string): void {
    if (this.dataChannel?.readyState === 'open') {
      this.dataChannel.send(data);
    }
  }
  disconnect() {
    this.signalServer?.disconnect();
  }
  closeDataChannel() {
    this.dataChannel?.close();
    this.dataChannel = undefined;
  }

  private publishChanges() {
    this.onStateChange();
  }
  private createPeerConnection() {
    const peerConnection = new (this
      .RTC as unknown as TCxRTC.IRTCPeerConnectionConstructor)();

    this.isDebug &&
      console.log(
        `[🐽](TCxConnectionManager.ts) [${this.tcxName}] setting up ice candidate handler`,
      );
    peerConnection.onicecandidate = (event) => this.rtc_onicecandidate(event);
    peerConnection.ondatachannel = (event) => this.rtc_ondatachannel(event);

    this.peerConnection = peerConnection;
  }

  private createDataChannel() {
    if (!this.peerConnection) {
      console.error(
        `🔩❌ [${this.tcxName}] No peer connection to create data channel`,
      );
      return;
    }
    this.dataChannel = this.peerConnection.createDataChannel('data');
    this.dataChannel.onmessage = (event) => this.data_onmessage(event);
    this.dataChannel.onopen = () => this.data_onopen();
    this.dataChannel.onclose = () => this.data_onclose();
  }

  /**
   ___ ___ ___ _  _   _   _      ___ ___ _____   _____ ___
   / __|_ _/ __| \| | /_\ | |    / __| __| _ \ \ / / __| _ \
   \__ \| | (_ | .` |/ _ \| |__  \__ \ _||   /\ V /| _||   /
   |___/___\___|_|\_/_/ \_\____| |___/___|_|_\ \_/ |___|_|_\
   */
  private get ssEventHandlers(): TCxSSEvents {
    return {
      onopen: this.ss_onopen.bind(this),
      onmessage: this.ss_onmessage.bind(this),
      onclose: this.ss_onclose.bind(this),
      onerror: this.ss_onerror.bind(this),
    };
  }
  private ss_onopen() {
    this.isDebug &&
      console.log(`🔩🌞 [${this.tcxName}] WebSocket Establishing Connection`);
    this.publishChanges();
  }
  private ss_onclose() {
    this.isDebug &&
      console.log(`🔩🌙 [${this.tcxName}] WebSocket Disconnected`);

    this.dataChannel?.close();
    this.peerConnection?.close();
    this.dataChannel = undefined;
    this.peerConnection = undefined;
    this.targetTcxName = undefined;

    this.publishChanges();
  }
  private ss_onerror(error: IWSCustomEvent) {
    console.error(`🔩❌ [${this.tcxName}] WebSocket Error:`, error);
  }
  private ss_onmessage(event: IWSCustomEvent) {
    const data =
      typeof event.data === 'string'
        ? JSON.parse(event.data as string)
        : event.data;

    const { type } = data;

    switch (type) {
      case 'offer':
        this.ss_onoffer(data);
        break;
      case 'answer':
        this.ss_onanswer(data);
        break;
      case 'new-ice-candidate':
        this.ss_onicecandidate(data.candidate);
        break;
      default:
        console.error(`🔩❌ [${this.tcxName}] Unknown event:`, data);
    }
  }
  private ss_onicecandidate(candidate: TCxRTC.IRTCIceCandidate) {
    this.isDebug &&
      console.log(`🔩🧊 [${this.tcxName}] ICE Candidate received:`, candidate);
    this.peerConnection?.addIceCandidate(candidate).catch((error) => {
      // some clients complain about null candidates
      // but this is part of the spec
      if (!candidate) return;
      // but if it's not null, we should log the error
      console.error(
        `🔩🧊❌ [${this.tcxName}] Error sending ICE candidate:`,
        error,
      );
    });
  }
  private ss_onoffer(event: unknown) {
    if (this.isConnectedToPeer) {
      this.isDebug &&
        console.log(
          `🔩💌❌ [${this.tcxName}] OFFER: Already connected to a peer`,
        );
      return;
    }
    this.isDebug &&
      console.log(
        `🔩💌📬 [${this.tcxName}] OFFER: We were invited to a dance! :`,
        event,
      );
    const { offer, fromTcxName } = event as {
      offer: IRTCSessionDescriptionInit;
      targetTcxName: string;
      fromTcxName: string;
    };

    this.targetTcxName = fromTcxName;

    this.createPeerConnection();
    const peerConnection = this.peerConnection;
    if (!peerConnection) {
      console.error(`🔩💌❌ [${this.tcxName}] No peer connection to set offer`);
      return;
    }

    peerConnection.setRemoteDescription(offer).then(() => {
      peerConnection.createAnswer().then((answer) => {
        peerConnection.setLocalDescription(answer).then(() => {
          const message = {
            type: 'answer',
            answer,
            targetTcxName: fromTcxName,
            fromTcxName: this.tcxName,
          };
          // send the answer
          this.signalServer?.connection?.send(JSON.stringify(message));
        });
      });
    });
  }
  private ss_onanswer(event: unknown) {
    const { answer } = event as { answer: IRTCSessionDescriptionInit };
    if (!this.peerConnection) {
      console.error(
        `🔩📝❌ [${this.tcxName}] No peer connection to set answer`,
      );
      return;
    }
    this.peerConnection.setRemoteDescription(answer).then(() => {
      this.isDebug &&
        console.log(`🔩📝✅ [${this.tcxName}] ANSWER : OFFER ACCEPTED!`);

      // let's send all the ice candidates we have
      const iceCandidates = [...this.unsentCandidates];
      this.unsentCandidates = [];
      iceCandidates.forEach((candidate) =>
        this._rtc_sendIceCandidate(candidate),
      );

      // we should hear about the dataChannel in the callbacks at some point
    });
  }

  /**
   *   __      _____ ___ ___ _____ ___
   *   \ \    / / __| _ ) _ \_   _/ __|
   *    \ \/\/ /| _|| _ \   / | || (__
   *     \_/\_/ |___|___/_|_\ |_| \___|
   */

  private rtc_onicecandidate(event: unknown) {
    const { candidate } = event as {
      candidate: TCxRTC.IRTCIceCandidate | null;
    };
    this._rtc_sendIceCandidate(candidate);
  }
  private rtc_ondatachannel(event: TCxRTC.RTCDataChannelEvent) {
    const { channel } = event;
    this.isDebug &&
      console.log(`🔩💿 [${this.tcxName}] DataChannel Received:`, event);
    channel.onmessage = (event) => this.data_onmessage(event);
    channel.onopen = () => this.data_onopen();
    channel.onclose = () => this.data_onclose();
    this.dataChannel = channel;
  }
  private _rtc_sendIceCandidate(candidate: TCxRTC.IRTCIceCandidate | null) {
    // CACHE THE CANDIDATE if connection is not stable
    if (this.peerConnection?.signalingState !== 'stable') {
      this.unsentCandidates.push(candidate);
      return;
    }

    this.isDebug &&
      console.log(
        `🔩🧊 [${this.tcxName}] RTC : ICE Candidate to send:`,
        candidate,
      );

    // MUST HAVE SOMEONE TO SEND IT TO
    if (!this.targetTcxName) {
      this.isDebug &&
        console.log(
          `🔩🧊❌ [${this.tcxName}] ERROR : we do not have a target TCx to send ICE candidate to`,
        );
      return;
    }

    // CREATE A CARRYING MESSAGE
    const message = {
      type: 'new-ice-candidate',
      candidate: candidate,
      targetTcxName: this.targetTcxName,
    };

    // SEND IT
    this.signalServer?.connection?.send(JSON.stringify(message));
  }

  //  ___   _ _____ _
  // |   \ /_\_   _/_\
  // | |) / _ \| |/ _ \
  // |___/_/ \_\_/_/ \_\
  private data_onmessage(event: { data: unknown }) {
    this.isDebug &&
      console.log(`🔩💿 [${this.tcxName}] DataChannel Data:`, event.data);
    this.onData(event.data);
  }
  private data_onopen() {
    // not quite opened yet
    if (this.dataChannel?.readyState !== 'open') return;

    this.isDebug &&
      console.log(`🔩💿 [${this.tcxName}] DataChannel Fully Opened`);
    this.publishChanges();
  }
  private data_onclose() {
    this.isDebug &&
      console.log(`🔩💿 [${this.tcxName}] DataChannel Fully Closed`);
    this.publishChanges();
  }
}

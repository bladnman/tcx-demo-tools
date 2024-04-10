import TCx from '@tcx-hosted/tcx/TCx.ts';
import {
  IWebSocketConstructor,
  TCxSSOptions,
} from '@tcx-hosted/tcx/TCxSignalServerManager.ts';

// TODO: USE ME
// import {
//   RTCPeerConnection,
// } from 'react-native-webrtc';

interface TCxManagerOptions {
  tcxName: string;
  options: TCxSSOptions;
  onData?: (data: unknown) => void;
  onStateUpdate?: () => void;
}

/**
 * TCxRN
 *
 * This is, essentially, the "useTCx" hook for Class-based RN implementations.
 *
 * This is the main class that manages the TCx connection for NodeJS.
 * This manager class is responsible for creating and managing the TCx connection.
 * You will receive callbacks for data and state updates.
 *
 */
class TCxRN {
  private readonly tcxName: string;
  private readonly options: TCxSSOptions;
  private tcx: TCx | null;
  private readonly onData?: (data: unknown) => void;
  private readonly onStateUpdateCallback?: () => void;

  constructor({ tcxName, onData, options, onStateUpdate }: TCxManagerOptions) {
    this.tcxName = tcxName;
    this.onData = onData;
    this.options = options;
    this.tcx = null;
    this.onStateUpdateCallback = onStateUpdate;

    this.initTCx();
  }

  get isConnectedToPeer(): boolean {
    return this.tcx ? this.tcx.isConnectedToPeer : false;
  }

  get isConnectedToSignalServer(): boolean {
    return this.tcx ? this.tcx.isConnectedToSignalServer : false;
  }

  private handleStateChange = (): void => {
    const tcx = this.tcx;
    if (!tcx) return;
    if (this.onStateUpdateCallback) {
      this.onStateUpdateCallback();
    }
  };

  private handleConnect = (): void => {
    // console.log('Connected to peer');
  };
  private handleDisconnect = (): void => {
    // console.log('Disconnected from peer');
  };

  private initTCx = (): void => {
    if (this.tcx) {
      this.tcx.disconnect();
    }
    this.tcx = new TCx(
      WebSocket as unknown as IWebSocketConstructor,
      RTCPeerConnection as unknown as TCxRTC.IRTCPeerConnectionConstructor,
      this.tcxName,
      this.handleStateChange,
      this.options,
      this.onData,
      { onConnect: this.handleConnect, onDisconnect: this.handleDisconnect },
    );

    this.tcx.register().catch((error) => {
      console.error('❌ Failed to register with signal server', error);
    });
  };

  public send = (data: unknown): void => {
    this.tcx?.send(data);
  };

  public destroy = (): void => {
    this.tcx?.disconnect();
  };
  public disconnect = (): void => {
    this.tcx?.disconnect();
  };
}

export default TCxRN;

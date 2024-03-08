import Peer, { DataConnection, PeerOptions } from 'peerjs';

export interface TCxConnectionState {
  tcxName: string;
  isPeerReady: boolean;
  isConnectionReady: boolean;
  peer?: Peer;
  connection?: DataConnection;
}
export interface TCxInterface extends TCxConnectionState {
  connectTo: (targetName: string) => void;
  sendData: (data: any) => void;
}

export default class TCx {
  public peer?: Peer;
  protected _name: string;
  protected _connection?: DataConnection;

  get name(): string {
    return this._name;
  }
  get connection(): DataConnection | undefined {
    return this._connection;
  }
  get connectedToName(): string | undefined {
    return this.connection?.peer;
  }
  get isRegistered(): boolean {
    return this.peer?.open ?? false;
  }
  get isConnected(): boolean {
    return !!this.connection;
  }

  constructor(
    name: string,
    public onStateChange: (tcx: TCx) => void,
    public onData?: (data: never) => void,
    public connectToName?: string,
    private options?: PeerOptions,
  ) {
    this._name = name;
    this.register();

    // If we were given a peer to connect to, do so now
    if (this.connectToName) {
      this.connectTo(this.connectToName);
    }
  }

  public destroy(): void {
    this.peer?.destroy();
    this.disconnect();
  }

  public register(): void {
    this.peer = new Peer(this.name, this.options); // TODO: Add error handling
    this.setupPeerEvents(this.peer);
  }

  private setupPeerEvents(peer: Peer): void {
    peer.on('open', (id: string) => {
      this._name = id;
      this.publishStateChange();
    });

    peer.on('connection', (cnx: DataConnection) => {
      this.setupConnectionEvents(cnx);
      this._connection = cnx;
      this.publishStateChange();
    });

    peer.on('disconnected', () => {
      this._connection = undefined;
      this.publishStateChange();
    });
  }

  private setupConnectionEvents(cnx: DataConnection): void {
    cnx.on('open', () => {
      console.log(`🐽🕹️ Connection opened to [${cnx.peer}]`);
    });

    cnx.on('data', (data) => {
      this.onData?.(data as never);
    });

    cnx.on('close', () => {
      this._connection = undefined;
      this.publishStateChange();
    });
  }

  private publishStateChange(): void {
    this.onStateChange(this);
  }

  public connectTo(targetName: string): void {
    if (!this.peer) {
      console.warn(`🐽🧤 No peer to connect to`);
      return;
    }

    this._connection = this.peer.connect(targetName); // TODO: Add error handling

    if (this.connection) {
      this.setupConnectionEvents(this.connection);
    } else {
      console.warn(`🐽🧤 No connection established`);
    }

    this.publishStateChange();
  }
  public disconnect(): void {
    if (!this.peer) return;

    this.connection?.close();
    this._connection = undefined;

    this.publishStateChange();
  }
  public unregister(): void {
    if (!this.peer) return;

    this.connection?.close();
    this._connection = undefined;
    this.peer.disconnect();

    this.publishStateChange();
  }

  public sendData(data: never): void {
    if (this.connection) {
      this.connection.send(data);
    }
  }
}

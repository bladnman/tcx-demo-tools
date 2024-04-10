export interface ISSMessageWrapper {
  data: IWSCustomEvent;
}
export interface IWSCustomEvent {
  type: string;
  targetTcxName?: string;
  data?: unknown;
  code?: number;
  error?: string;
  reason?: string;
  offer?: unknown;
}
export interface IWebSocket {
  send(data: string | ArrayBuffer | Blob | ArrayBufferView): void;
  close(code?: number, reason?: string): void;
  onmessage?: (this: IWebSocket, ev: IWSCustomEvent) => void;
  onopen?: (this: IWebSocket, ev: IWSCustomEvent) => void;
  onclose?: (this: IWebSocket, ev: IWSCustomEvent) => void;
  onerror?: (this: IWebSocket, ev: IWSCustomEvent) => void;
  readyState: number; // 0: CONNECTING, 1: OPEN, 2: CLOSING, 3: CLOSED
}
export interface IWebSocketConstructor {
  new (url: string, protocols?: string | string[]): IWebSocket;
}

export interface TCxSSOptions {
  host: string;
  port: number;
  path: string;
  debug: boolean;
}
export interface TCxSSEvents {
  onopen: () => void;
  onmessage: (event: IWSCustomEvent) => void;
  onclose: (event: IWSCustomEvent) => void;
  onerror: (error: IWSCustomEvent) => void;
}
export default class TCxSignalServerManager {
  tcxName: string;
  eventHandlers: TCxSSEvents;
  connection: IWebSocket | undefined;
  options: TCxSSOptions;
  debug: boolean;

  get isConnected(): boolean {
    return this.connection?.readyState === 1;
  }

  private get baseUrl() {
    return `ws://${this.options.host}:${this.options.port}${this.options.path}?tcxName=${this.tcxName}`;
  }

  constructor(
    tcxName: string,
    eventHandlers: TCxSSEvents,
    options: TCxSSOptions,
  ) {
    this.tcxName = tcxName;
    this.eventHandlers = eventHandlers;
    this.options = options;
    this.debug = options.debug;
  }

  connect(WS: IWebSocketConstructor): Promise<void> {
    return new Promise((resolve, reject) => {
      this.debug && console.log(`🛜 [${this.tcxName}] Connecting`);
      // Create a new WebSocket instance
      this.connection = new WS(this.baseUrl);

      // Assign event handlers
      this.connection.onopen = () => {
        this.cnx_onopen(); // Call the original handler
        resolve(); // Resolve the promise when the connection is open
      };

      this.connection.onmessage = this.cnx_onmessage.bind(this);
      this.connection.onclose = this.cnx_onclose.bind(this);
      this.connection.onerror = (event) => {
        this.cnx_onerror(event); // Call the original error handler
        reject(event); // Reject the promise on error
      };
    });
  }

  send(data: unknown) {
    if (this.isConnected) {
      this.connection?.send(JSON.stringify(data));
      this.debug && console.log(`🛜 [${this.tcxName}] Sent`, data);
    } else {
      this.debug &&
        console.error(`🛜 [${this.tcxName}] WebSocket is not connected`);
    }
  }

  disconnect() {
    this.debug && console.log(`🛜 [${this.tcxName}] Closing connection`);
    this.connection?.close();
    this.connection = undefined;
  }

  //    ___ ___  _  _ _  _ ___ ___ _____ ___ ___  _  _
  //   / __/ _ \| \| | \| | __/ __|_   _|_ _/ _ \| \| |
  //  | (_| (_) | .` | .` | _| (__  | |  | | (_) | .` |
  //   \___\___/|_|\_|_|\_|___\___| |_| |___\___/|_|\_|
  private cnx_onmessage(event: IWSCustomEvent) {
    // Helper function to process data
    const processData = (data: { code?: number; error?: string }) => {
      if (data.code === 4000) {
        this.debug &&
          console.error(`🛜 [${this.tcxName}] Error from server:`, data.error);
        this.eventHandlers.onerror({ type: 'error', reason: data.error });
      } else {
        this.debug &&
          console.log(`🛜 [${this.tcxName}] Message from server:`, data);
        this.eventHandlers.onmessage({ type: 'message', data });
      }
    };

    if (typeof event.data === 'string') {
      try {
        const potentialBufferObject = JSON.parse(event.data);
        if (
          potentialBufferObject.type === 'Buffer' &&
          Array.isArray(potentialBufferObject.data)
        ) {
          // Assuming the data array represents a UTF-8 encoded string
          const stringFromBuffer = String.fromCharCode(
            ...potentialBufferObject.data,
          );
          // If the resulting string is expected to be JSON, parse it again
          const data = JSON.parse(stringFromBuffer);
          processData(data);
        } else {
          // Handle normal JSON object
          processData(potentialBufferObject);
        }
      } catch (error) {
        this.debug &&
          console.error(`🛜 [${this.tcxName}] JSON parsing error:`, error);
        this.eventHandlers.onerror({
          type: 'error',
          reason: 'JSON parsing error',
        });
      }
    }
  }

  private cnx_onopen() {
    this.debug && console.log(`🛜 [${this.tcxName}] WebSocket Connected`);
    this.eventHandlers.onopen();
  }
  private cnx_onclose(ev: IWSCustomEvent) {
    // 1002 is "no tcxName query parameter" error
    if (ev.code === 1002) {
      this.connection?.onerror?.({
        type: 'error',
        reason: ev.reason ?? 'No tcxName query parameter',
      });
    }
    // 1003 is "tcxName name taken" error
    if (ev.code === 1003) {
      this.connection?.onerror?.({
        type: 'error',
        reason: ev.reason ?? 'tcxName name taken',
      });
    }
    // other reasons
    else {
      this.debug && console.log(`🛜 [${this.tcxName}] WebSocket Closed`, ev);
      this.eventHandlers.onclose(ev);
    }
  }
  private cnx_onerror(error: IWSCustomEvent) {
    this.debug &&
      console.error(`🛜 [${this.tcxName}] Connection Error:`, error);
    this.eventHandlers.onerror(error);
  }
}

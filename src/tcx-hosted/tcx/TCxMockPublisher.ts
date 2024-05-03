type DataHandler = (data: unknown) => void;
type TCxMockPublisherProps = {
  data: unknown[];
  onData: DataHandler;
  delayMs: number;
  batchSize: number;
  autoPause: boolean;
  onStateChange: (publisher: TCxMockPublisher) => void;
};
class TCxMockPublisher {
  private queue: unknown[];
  private readonly onData: DataHandler;
  private readonly onStateChange: (publisher: TCxMockPublisher) => void;
  private timerId: NodeJS.Timeout | null = null;
  public autoPause: boolean = false;
  public batchSize: number = 1;
  public delayMs: number;

  get isRunning(): boolean {
    return this.timerId !== null;
  }

  private static instances: Map<string, TCxMockPublisher> = new Map();
  static getInstance(props: TCxMockPublisherProps): TCxMockPublisher {
    const className = this.name;
    let instance = TCxMockPublisher.instances.get(className);

    if (!instance) {
      instance = new this(props);
      TCxMockPublisher.instances.set(className, instance);
    }
    return instance;
  }

  constructor(props: TCxMockPublisherProps) {
    const { data, onData, delayMs, batchSize, autoPause, onStateChange } = props;
    this.queue = [...data]; // copy the data, we will mutate it
    this.onData = onData;
    this.delayMs = delayMs;
    this.batchSize = batchSize;
    this.autoPause = autoPause;
    this.onStateChange = onStateChange;
  }

  private startTimer(): void {
    if (this.timerId) {
      clearInterval(this.timerId);
    }
    this.timerId = setInterval(() => {
      this.publishNext();
    }, this.delayMs);
  }
  private stopTimer(): void {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  start(): void {
    this.startTimer();
    this.onStateChange(this);
  }

  stop(): void {
    this.stopTimer();
    this.onStateChange(this);
  }

  publishNext(): void {
    // bail - no data to publish
    if (this.queue.length === 0) return;

    const nextData = this.queue.splice(0, this.batchSize);
    this.onData(nextData as unknown);

    // if we are auto-pausing, stop publishing
    if (this.autoPause) {
      this.stop();
    }
  }
}

// Example usage:
// const publisher = new TCxMockPublisher<number>([1, 2, 3], console.log, 1000);
// publisher.start();

export default TCxMockPublisher;

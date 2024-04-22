type DataHandler<T> = (data: T) => void;

class TCxMockPublisher<T> {
  private queue: T[];
  private delayMs: number;
  private readonly onData: DataHandler<T>;
  private readonly onStateChange: () => void;
  private timerId: NodeJS.Timeout | null = null;
  private isPaused: boolean = false;
  private readonly batchSize: number = 1;

  get isRunning(): boolean {
    return this.timerId !== null;
  }

  constructor(
    data: T[],
    onData: DataHandler<T>,
    delayMs: number,
    batchSize: number,
    onStateChange: () => void,
  ) {
    this.queue = [...data]; // copy the data, we will mutate it
    this.onData = onData;
    this.delayMs = delayMs;
    this.batchSize = batchSize;
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
    this.isPaused = false;
    this.onStateChange();
  }

  stop(): void {
    this.stopTimer();
    this.isPaused = true;
    this.onStateChange();
  }

  publishNext(): void {
    // bail - no data to publish
    if (this.queue.length === 0) return;

    const nextData = this.queue.splice(0, this.batchSize);
    this.onData(nextData as T);
  }

  addData(data: T | T[]): void {
    if (!Array.isArray(data)) {
      data = [data];
    }
    this.queue.push(...data);
  }

  clearData(): void {
    this.queue = [];
  }

  setDelayMs(delayMs: number): void {
    this.delayMs = delayMs;
    if (!this.isPaused) {
      this.start();
    }
  }

  destroy(): void {
    this.stopTimer();
    this.queue = [];
  }
}

// Example usage:
// const publisher = new TCxMockPublisher<number>([1, 2, 3], console.log, 1000);
// publisher.start();

export default TCxMockPublisher;

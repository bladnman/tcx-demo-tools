type DataHandler<T> = (data: T) => void;

class TCxMockPublisher<T> {
  private queue: T[];
  private delayMs: number;
  private onData: DataHandler<T>;
  private timerId: NodeJS.Timeout | null = null;
  private isPaused: boolean = false;

  constructor(data: T[], onData: DataHandler<T>, delayMs: number) {
    this.queue = data;
    this.onData = onData;
    this.delayMs = delayMs;
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
  }

  stop(): void {
    this.stopTimer();
    this.isPaused = true;
  }

  publishNext(): void {
    // bail - no data to publish
    if (this.queue.length === 0) return;

    this.onData(this.queue.shift() as T);
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

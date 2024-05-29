type EventCallback = (events: object[]) => void;

class ReceiverQueue {
  private events: object[] = [];
  private intervalId: NodeJS.Timeout | null = null;
  private intervalTime: number;
  private callback: EventCallback;

  constructor(intervalTime: number, callback: EventCallback) {
    this.intervalTime = intervalTime;
    this.callback = callback;
  }

  // Add an event to the queue
  public addEvent(event: object): void {
    this.events.push(event);
  }

  // Start processing the queue
  public start(): void {
    if (this.intervalId === null) {
      this.intervalId = setInterval(() => this.processQueue(), this.intervalTime);
    }
  }

  // Stop processing the queue
  public stop(): void {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  // Process the queue
  private processQueue(): void {
    if (this.events.length > 0) {
      const eventsToProcess = [...this.events];
      this.events = [];
      this.callback(eventsToProcess);
    }
  }
}
export default ReceiverQueue;

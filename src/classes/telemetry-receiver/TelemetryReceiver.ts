class TelemetryReceiver {
  public onEvents: (events: unknown) => void = () => {};

  ingestedEvents: unknown[] = [];

  constructor(onEvents: (events: unknown) => void) {
    this.onEvents = onEvents;
    // @ts-expect-error - Expose ingestedEvents for testing
    window.ingestedEvents = this.ingestedEvents;
    console.warn(
      `🚨 Ingested Events are being collected. \n\nThis is a testing-only feature and should not be used in production. \n\nThis uses far more memory than necessary and will slow down the application. \n\nTo see the ingested events, type: ingestedEvents in the console.`,
    );
  }

  public receiveEvents = (events: unknown) => {
    this.ingestedEvents.push(events);
    // this.ingestedEvents = this.ingestedEvents.flat();
    this.onEvents(events);
  };
}
export default TelemetryReceiver;

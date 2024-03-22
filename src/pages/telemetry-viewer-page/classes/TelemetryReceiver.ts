class TelemetryReceiver {
  public onEvents: (events: TVEvent[]) => void = () => {};

  constructor(onEvents: (events: TVEvent[]) => void) {
    this.onEvents = onEvents;
  }

  public receiveEvents(events: TelemetryDebuggerEvent[]) {
    // MAPPER
    // conform different event types to the same type
    const tvEvents = events
      .map(this.mapEvent)
      .filter((e) => e !== null) as TVEvent[];
    this.onEvents(tvEvents);
  }

  private mapEvent(event: TelemetryDebuggerEvent): TVEvent | null {
    if (!event.id || event.id === '') {
      console.error('RECEIVED EVENT INCOMPLETE: Missing [id]', event);
      return null;
    }

    const [namespace, type] = event.eventName.split(':');

    if (!type) {
      console.error('RECEIVED EVENT INCOMPLETE: Missing [type]', event);
      return null;
    }

    return {
      tracingId: event.id,
      type,
      namespace,
      appName: event.appName === null ? undefined : event.appName,
      tdEvent: event,
    };
  }
}
export default TelemetryReceiver;

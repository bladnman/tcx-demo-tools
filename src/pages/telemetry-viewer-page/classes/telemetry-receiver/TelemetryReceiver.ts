import eventMapper from '@pages/telemetry-viewer-page/classes/telemetry-receiver/eventMapper.ts';

class TelemetryReceiver {
  public onEvents: (events: TVEvent[]) => void = () => {};

  constructor(onEvents: (events: TVEvent[]) => void) {
    this.onEvents = onEvents;
  }

  public receiveEvents = (events: unknown) => {
    let eventsArray = events as unknown[];
    if (!Array.isArray(events)) {
      eventsArray = [events];
    }

    // MAP TO TV EVENTS
    this.onEvents(eventMapper(eventsArray));
  };
}
export default TelemetryReceiver;

import mapEventsToTVEvents from '@pages/telemetry-viewer-page/classes/telemetry-receiver/utils/mapEventsToTVEvents.ts';

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
    this.onEvents(mapEventsToTVEvents(eventsArray));
  };
}
export default TelemetryReceiver;

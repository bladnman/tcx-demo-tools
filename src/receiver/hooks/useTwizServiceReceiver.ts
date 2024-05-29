import ReceiverQueue from '@src/receiver/classes/ReceiverQueue.ts';
import TelemetryReceiver from '@src/receiver/classes/telemetry-receiver/TelemetryReceiver.ts';
import actionAddUnMappedEvents from '@store/event-store/actions/actionAddUnMappedEvents.ts';
import useSettingsStore from '@store/settings-store/useSettingsStore.ts';
import { useEffect, useMemo } from 'react';

export default function useTwizServiceReceiver() {
  const { connectToTCxName } = useSettingsStore();

  // we use the receiver to receive events and to clean them up
  // before they are sent to the store
  const receiver = useMemo(() => new TelemetryReceiver(actionAddUnMappedEvents), []);

  // Create a ReceiverQueue with a 5-second interval and the receiver's receiveEvents method as the callback
  const receiverQueue = useMemo(
    () => new ReceiverQueue(500, receiver.receiveEvents),
    [receiver],
  );

  useEffect(() => {
    if (!connectToTCxName) return;

    const serviceUrl = 'http://localhost:3005/sse/subscribe?deviceId=all';
    const es = new EventSource(serviceUrl);
    es.onmessage = (sourceEvent) => {
      const event = JSON.parse(sourceEvent.data);
      receiverQueue.addEvent(event);
    };

    receiverQueue.start(); // Start the queue processing

    return () => {
      es?.close();
      receiverQueue.stop(); // Stop the queue processing
    };
  }, [connectToTCxName, receiverQueue]);

  return null;
}

import useEventStore from '@store/event-store/useEventStore.ts';

export default function actionSetEventForDetailsById(id?: string | null) {
  const { allEvents } = useEventStore.getState();
  const event = allEvents.find((e) => e.twId === id);
  useEventStore.setState({ eventForDetails: event ?? null });
}

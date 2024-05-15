export default function getTvFilteredEvent(event: TVEvent): Hash | null | undefined {
  if (!event) return undefined;
  return event.dispatchedEvents?.at(-1)?.filteredEvent;
}

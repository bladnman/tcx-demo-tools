import useEventStore from '@store/event-store/useEventStore.ts';

export default function actionClearFilters() {
  const filters = useEventStore.getState().filters;
  filters.forEach((filter) => filter.clearActive());
  useEventStore.setState({ filters: [...filters] });
}

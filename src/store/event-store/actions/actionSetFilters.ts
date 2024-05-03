import TelemetryFilter from '@classes/TelemetryFilter.ts';
import useEventStore from '@store/event-store/useEventStore.ts';

export default function actionSetFilters(filters: TelemetryFilter[]) {
  useEventStore.setState({ filters: [...filters] });
}

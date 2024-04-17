import TelemetryFilter from '@pages/telemetry-viewer-page/classes/TelemetryFilter.ts';
import useEventStore from '@pages/telemetry-viewer-page/store/event-store/useEventStore.ts';

export default function actionSetFilters(filters: TelemetryFilter[]) {
  useEventStore.setState({ filters: [...filters] });
}

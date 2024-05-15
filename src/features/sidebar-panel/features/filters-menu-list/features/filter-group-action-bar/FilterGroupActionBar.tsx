import TelemetryFilter from '@classes/TelemetryFilter.ts';
import FGActionBarEventType from '@features/sidebar-panel/features/filters-menu-list/features/filter-group-action-bar/featues/FGActionBarEventType.tsx';

export default function FilterGroupActionBar({ filter }: { filter: TelemetryFilter }) {
  switch (filter.type as string) {
    case 'eventType':
    case 'type':
      return <FGActionBarEventType filter={filter} />;
    default:
      return null;
  }
}

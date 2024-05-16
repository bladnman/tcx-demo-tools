import TWEvent from '@classes/data/TWEvent.ts';
import TelemetryFilter from '@classes/TelemetryFilter.ts';
import useSettingsStore from '@store/settings-store/useSettingsStore.ts';

export default function applyFilters(
  events: TWEvent[],
  filters: TelemetryFilter[],
): TWEvent[] {
  // no filters -- return all events
  if (filters.length === 0) return events;
  const anyActive = filters.some((filter) => filter.anyActive);
  if (!anyActive) return events;

  const filterMode = useSettingsStore.getState().filterMode;

  /**
   * Filtering has several ways to be conducted.
   *
   * The concern here is how multiple filters are combined.
   *
   * The typical way is the "AND" mode, where all filters must include the event.
   * This allows for a more refined search. An item must be an "interaction" and from "game-hub".
   *
   * The other way is the "OR" mode, where at least one filter must include the event.
   * This allows for broad searches. An item can be an "interaction" or from "game-hub".
   * This method offers you the ability to essentially combine multiple searches into one.
   * This example would show all items from game-hub and all items that are interactions.
   *
   * AND is the default mode, and the one a user would typically expect.
   */

  /**
   * AND mode:
   * - filters that have active items must include the event
   * - all filters must include the event
   *
   * OR mode:
   * - filters that have active items can include the event
   * - at least one filter must include the event
   */
  if (filterMode === 'AND') {
    return events.filter((event) => {
      return filters.every((filter) => {
        return filter.testForActive(event);
      });
    });
  }

  // OR mode
  else {
    return events.filter((event) => {
      return filters.some((filter) => {
        if (!filter.anyActive) return false;
        return filter.testForActive(event);
      });
    });
  }
}

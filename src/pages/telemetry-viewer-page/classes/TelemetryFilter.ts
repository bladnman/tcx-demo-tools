import TelemetryFilterItem from '@pages/telemetry-viewer-page/classes/TelemetryFilterItem.ts';
import { getValueFromEvent } from '@pages/telemetry-viewer-page/utils/telemetry-utils.ts';

class TelemetryFilter {
  type: FilterType;
  field: FilterType;
  name: string = '';
  items: TelemetryFilterItem[] = [];
  collapsed: boolean = false;

  constructor(fieldDef: FieldDefinition) {
    this.name = fieldDef.title;
    this.type = fieldDef.field as FilterType; // TODO: is this real? can we just use strings here?
    this.field = fieldDef.field as FilterType; // TODO: is this real? can we just use strings here?
    this.collapsed = fieldDef.filter?.isDefaultCollapsed ?? false;
  }

  get values(): string[] {
    return this.items?.map((item) => item.value) ?? [];
  }
  get activeValues(): string[] {
    return (
      this.items?.filter((item) => item.active).map((item) => item.value) ?? []
    );
  }

  get anyActive(): boolean {
    return this.items.some((item) => item.active);
  }

  clearItems() {
    this.items = [];
  }

  clearActive() {
    this.items.forEach((item) => (item.active = false));
  }

  activateAll() {
    this.items.forEach((item) => (item.active = true));
  }

  getItem(value: string) {
    return this.items.find((item) => item.value === value);
  }

  activateValues(values: string | string[] | undefined) {
    if (!values) return;
    if (!Array.isArray(values)) {
      values = [values];
    }
    values.forEach((value) => {
      let item = this.getItem(value);
      /**
       * Oddly, we need to be able to 'activate' values
       * that this filter has not yet seen. This will allow us
       * to rebuild old filters (e.g. from disk)
       */
      if (!item) {
        item = this.addValue(value);
      }
      item.active = true;
    });
  }
  deactivateValues(values: string | string[] | undefined) {
    if (!values) return;
    if (!Array.isArray(values)) {
      values = [values];
    }
    values.forEach((value) => {
      const item = this.getItem(value);
      if (item) {
        item.active = false;
      }
    });
  }

  incrementEvents(events: TVEvent | TVEvent[] | undefined) {
    if (!events) return;
    if (!Array.isArray(events)) {
      events = [events];
    }
    const values = events
      .map((event: TVEvent) => {
        return this.valueForEvent(event);
      })
      .filter((v) => v !== undefined);
    this.incrementValues(values as string[]);
  }
  decrementEvents(events: TVEvent | TVEvent[] | undefined) {
    if (!events) return;
    if (!Array.isArray(events)) {
      events = [events];
    }
    const values = events
      .map((event: TVEvent) => {
        return this.valueForEvent(event);
      })
      .filter((v) => v !== undefined);
    this.decrementValues(values as string[]);
  }

  incrementValues(values: string | string[] | undefined) {
    if (!values) return;
    if (!Array.isArray(values)) {
      values = [values];
    }
    values.forEach((value) => {
      let item = this.getItem(value);
      if (item) {
        item.count++;
      } else {
        item = new TelemetryFilterItem(this.type, value);
        item.count++;
        this.items.push(item);
      }
    });
  }
  addValues(values: string | string[] | undefined) {
    if (!values) return;
    if (!Array.isArray(values)) {
      values = [values];
    }
    values.forEach((value) => {
      const item = this.getItem(value);
      if (!item) {
        this.addValue(value);
      }
    });
  }
  addValue(value: string): TelemetryFilterItem {
    let item = this.getItem(value);
    if (!item) {
      item = new TelemetryFilterItem(this.type, value);
      this.items.push(item);
    }
    return item;
  }

  decrementValues(values: string | string[] | undefined) {
    if (!values) return;
    if (!Array.isArray(values)) {
      values = [values];
    }
    values.forEach((value) => {
      const item = this.getItem(value);
      if (item) {
        item.count--;
        if (item.count === 0) {
          this.items = this.items.filter((i) => i.value !== value);
        }
      }
    });
  }

  private valueForEvent(event: TVEvent): string {
    return getValueFromEvent(event, this.type) ?? 'Unknown';
  }

  testForActive(event: TVEvent) {
    if (this.items.length === 0) return true; // no items -- pass
    if (!this.anyActive) return true; // property does not exist in event -- pass

    return this.activeValues.includes(this.valueForEvent(event));
  }
  testExists(event: TVEvent) {
    if (this.items.length === 0) return true; // no items -- pass
    if (!this.anyActive) return true; // property does not exist in event -- pass

    return this.values.includes(this.valueForEvent(event));
  }
}

export default TelemetryFilter;

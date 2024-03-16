class TelemetryFilterItem {
  count: number = 0;
  active: boolean = false;
  constructor(
    public readonly type: FilterType,
    public readonly value: string,
  ) {}
}
export default TelemetryFilterItem;

export default function getNameForFilterType(filterType: FilterType) {
  switch (filterType) {
    case 'type':
      return 'Event Type';
    case 'appName':
      return 'App Name';
    case 'platformType':
      return 'Platform Type';
    case 'namespace':
      return 'Namespace';
    default:
      return 'Unknown Filter Type';
  }
}

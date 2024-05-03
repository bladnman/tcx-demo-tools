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
    case 'vshErrorHexCode':
      return 'Error Hex Code';
    case 'severity':
      return 'Severity';
    case 'hostAppName':
      return 'Host App Name';
    case 'errorType':
      return 'Error Type';
    case 'errorSubType':
      return 'Error Subtype';
    case 'consoleSessionId':
      return 'Console Session ID';
    case 'appInstanceId':
      return 'App Instance ID';

    default:
      return 'Unknown Filter Type';
  }
}

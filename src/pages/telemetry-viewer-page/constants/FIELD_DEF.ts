const FIELD_DEF: FieldDefinition[] = [
  {
    field: 'type',
    title: 'Event Type',
    filter: {
      isAvailable: true,
      isDefault: true,
      isDefaultCollapsed: false,
    },
  },
  {
    field: 'appName',
    title: 'App Name',
    divider: {
      isAvailable: true,
      isDefault: false,
    },
    filter: {
      isAvailable: true,
      isDefault: true,
      isDefaultCollapsed: false,
    },
  },
  {
    field: 'platformType',
    title: 'Platform Type',
    divider: {
      isAvailable: true,
      isDefault: false,
    },
    filter: {
      isAvailable: true,
      isDefault: true,
      isDefaultCollapsed: true,
    },
  },
  {
    field: 'namespace',
    title: 'Namespace',
    divider: {
      isAvailable: true,
      isDefault: false,
    },
    filter: {
      isAvailable: true,
      isDefault: true,
      isDefaultCollapsed: true,
    },
  },
  {
    field: 'vshErrorHexCode',
    title: 'VSH Error Hex Code',
    filter: {
      isAvailable: true,
      isDefault: false,
      isDefaultCollapsed: true,
    },
  },
  {
    field: 'severity',
    title: 'Severity',
    filter: {
      isAvailable: true,
      isDefault: false,
      isDefaultCollapsed: true,
    },
  },
  {
    field: 'errorMessage',
    title: 'Error Message',
    filter: {
      isAvailable: true,
      isDefault: false,
      isDefaultCollapsed: true,
    },
  },
  {
    field: 'locationScene',
    title: 'Location Scene',
    divider: {
      isAvailable: true,
      isDefault: false,
    },
    filter: {
      isAvailable: true,
      isDefault: false,
      isDefaultCollapsed: true,
    },
  },
  {
    field: 'hostAppName',
    title: 'Host App Name',
    divider: {
      isAvailable: true,
      isDefault: false,
    },
    filter: {
      isAvailable: true,
      isDefault: false,
      isDefaultCollapsed: true,
    },
  },
  {
    field: 'visualEntityType',
    title: 'Visual Entity Type',
    filter: {
      isAvailable: true,
      isDefault: false,
      isDefaultCollapsed: true,
    },
  },
  {
    field: 'interactAction',
    title: 'Interact Action',
    filter: {
      isAvailable: true,
      isDefault: false,
      isDefaultCollapsed: true,
    },
  },
  {
    field: 'interactCts',
    title: 'Interact CTA',
    filter: {
      isAvailable: true,
      isDefault: false,
      isDefaultCollapsed: true,
    },
  },
  {
    field: 'entryReferrerApplicationName',
    title: 'Entry Ref. App Name',
    divider: {
      isAvailable: true,
      isDefault: false,
    },
    filter: {
      isAvailable: true,
      isDefault: false,
      isDefaultCollapsed: true,
    },
  },
  {
    field: 'errorType',
    title: 'Error Type',
    filter: {
      isAvailable: true,
      isDefault: false,
      isDefaultCollapsed: true,
    },
  },
  {
    field: 'errorSubType',
    title: 'Error Sub Type',
    filter: {
      isAvailable: true,
      isDefault: false,
      isDefaultCollapsed: true,
    },
  },
  {
    field: 'consoleSessionId',
    title: 'Console Session ID',
    divider: {
      isAvailable: true,
      isDefault: false,
    },
    filter: {
      isAvailable: true,
      isDefault: false,
      isDefaultCollapsed: true,
    },
  },
  {
    field: 'openPsId',
    title: 'Open PS ID',
    divider: {
      isAvailable: true,
      isDefault: false,
    },
    filter: {
      isAvailable: true,
      isDefault: false,
      isDefaultCollapsed: true,
    },
  },
];
export default FIELD_DEF;

// Utility type to extract 'field' property values into a union type
export type FieldNames = (typeof FIELD_DEF)[number]['field'];
export function getFieldNames(): FieldNames[] {
  return FIELD_DEF.map((f) => f.field);
}
export function getFieldDef(field: FieldNames): FieldDefinition | undefined {
  return FIELD_DEF.find((f) => f.field === field);
}
export function getDefaultFiltersFieldDefs(): FieldDefinition[] {
  const defs = FIELD_DEF.filter((f) => f.filter?.isDefault);
  // return ordered by default sort order
  return defs.sort((a, b) => {
    const aIdx = DEFAULT_FILTER_SORT_ORDER.indexOf(a.field) ?? 100;
    const bIdx = DEFAULT_FILTER_SORT_ORDER.indexOf(b.field) ?? 100;
    return aIdx - bIdx;
  });
}
export function getAllFiltersFieldDefs(): FieldDefinition[] {
  const defs = FIELD_DEF.filter((f) => f.filter?.isAvailable);
  // return ordered by default sort order
  return defs.sort((a, b) => {
    const aIdx = DEFAULT_FILTER_SORT_ORDER.indexOf(a.field) ?? 100;
    const bIdx = DEFAULT_FILTER_SORT_ORDER.indexOf(b.field) ?? 100;
    return aIdx - bIdx;
  });
}
export function getAllDividerFieldDefs(): FieldDefinition[] {
  const defs = FIELD_DEF.filter((f) => f.divider?.isAvailable);
  return defs;
}

// DEFAULT SORT ORDER - FILTERS
// This is the default sort order for the filters in the filter drawer
const DEFAULT_FILTER_SORT_ORDER = [
  'type',
  'appName',
  'platformType',
  'namespace',
  'locationScene',
  'consoleSessionId',
  'vshErrorHexCode',
  'severity',
  'errorMessage',
  'hostAppName',
  'visualEntityType',
  'interactAction',
  'interactCts',
  'entryReferrerApplicationName',
  'errorType',
  'errorSubType',
  'openPsId',
];

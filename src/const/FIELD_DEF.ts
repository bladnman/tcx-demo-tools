export function fieldDef(field: string) {
  return FIELD_DEF_ARRAY.find((f) => f.field === field);
}
const FIELD_DEF: { [key: string]: FieldDefinition } = {
  type: {
    field: 'twType',
    title: 'Event Type',
    paths: ['twType'],
    filter: {
      isAvailable: true,
      isDefault: true,
      isDefaultCollapsed: false,
    },
    divider: {
      isAvailable: true,
      isDefault: false,
    },
  },
  appName: {
    field: 'appName',
    title: 'App Name',
    paths: ['appName'],
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
  platformType: {
    field: 'platformType',
    title: 'Platform Type',
    paths: ['platformType'],
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
  namespace: {
    field: 'namespace',
    title: 'Namespace',
    paths: ['namespace'],
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
  vshErrorHexCode: {
    field: 'vshErrorHexCode',
    title: 'VSH Error Hex Code',
    paths: ['vshErrorHexCode'],
    filter: {
      isAvailable: true,
      isDefault: false,
      isDefaultCollapsed: true,
    },
  },
  severity: {
    field: 'severity',
    title: 'Severity',
    paths: ['severity'],
    filter: {
      isAvailable: true,
      isDefault: false,
      isDefaultCollapsed: true,
    },
  },
  errorMessage: {
    field: 'errorMessage',
    title: 'Error Message',
    paths: ['errorMessage'],
    filter: {
      isAvailable: true,
      isDefault: false,
      isDefaultCollapsed: true,
    },
  },
  locationScene: {
    field: 'locationScene',
    title: 'Location Scene',
    paths: ['locationScene'],
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
  hostAppName: {
    field: 'hostAppName',
    title: 'Host App Name',
    paths: ['hostAppName'],
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
  visualEntityType: {
    field: 'visualEntityType',
    title: 'Visual Entity Type',
    paths: ['visualEntityType'],
    filter: {
      isAvailable: true,
      isDefault: false,
      isDefaultCollapsed: true,
    },
  },
  interactAction: {
    field: 'interactAction',
    title: 'Interact Action',
    paths: ['interactAction'],
    filter: {
      isAvailable: true,
      isDefault: false,
      isDefaultCollapsed: true,
    },
  },
  interactCta: {
    field: 'interactCta',
    title: 'Interact CTA',
    paths: ['interactCta'],
    filter: {
      isAvailable: true,
      isDefault: false,
      isDefaultCollapsed: true,
    },
  },
  ctaSubType: {
    field: 'ctaSubType',
    title: 'CTA Sub Type',
    paths: ['ctaSubType'],
    filter: {
      isAvailable: true,
      isDefault: false,
      isDefaultCollapsed: true,
    },
  },
  searchTerm: {
    field: 'searchTerm',
    title: 'Search Term',
    paths: ['searchTerm'],
    filter: {
      isAvailable: false,
      isDefault: false,
      isDefaultCollapsed: true,
    },
  },
  strandName: {
    field: 'strandName',
    title: 'Strand Name',
    paths: ['strandName'],
    filter: {
      isAvailable: false,
      isDefault: false,
      isDefaultCollapsed: true,
    },
  },
  tilePosition: {
    field: 'tilePosition',
    title: 'Tile Position',
    paths: ['tilePosition'],
    filter: {
      isAvailable: false,
      isDefault: false,
      isDefaultCollapsed: true,
    },
  },
  tileContent: {
    field: 'tileContent',
    title: 'Tile Content',
    paths: ['tileContent'],
    filter: {
      isAvailable: false,
      isDefault: false,
      isDefaultCollapsed: true,
    },
  },
  tileFormat: {
    field: 'tileFormat',
    title: 'Tile Format',
    paths: ['PUB_EVENT.tileFormat'],
    filter: {
      isAvailable: false,
      isDefault: false,
      isDefaultCollapsed: true,
    },
  },
  entryReferrerApplicationName: {
    field: 'entryReferrerApplicationName',
    title: 'Entry Ref. App Name',
    paths: ['entryReferrerApplicationName'],
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
  referrerApplicationName: {
    field: 'referrerApplicationName',
    title: 'Referrer Application Name',
    paths: ['referrerApplicationName'],
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
  referrerScene: {
    field: 'referrerScene',
    title: 'Referrer Scene',
    paths: ['referrerScene'],
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
  errorType: {
    field: 'errorType',
    title: 'Error Type',
    paths: ['errorType'],
    filter: {
      isAvailable: true,
      isDefault: false,
      isDefaultCollapsed: true,
    },
  },
  errorSubType: {
    field: 'errorSubType',
    title: 'Error Sub Type',
    paths: ['errorSubType'],
    filter: {
      isAvailable: true,
      isDefault: false,
      isDefaultCollapsed: true,
    },
  },
  consoleSessionId: {
    field: 'consoleSessionId',
    title: 'Console Session ID',
    paths: ['consoleSessionId'],
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
  openPsId: {
    field: 'openPsId',
    title: 'Open PS ID',
    paths: ['openPsId'],
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
  mobileFeatureArea: {
    field: 'mobileFeatureArea',
    title: 'Mobile Feature Area',
    paths: ['mobileFeatureArea'],
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
  spanId: {
    field: 'spanId',
    title: 'Span Id',
    paths: ['spanId'],
    divider: {
      isAvailable: false,
      isDefault: false,
    },
    filter: {
      isAvailable: false,
      isDefault: false,
      isDefaultCollapsed: false,
    },
  },
  // video
  videoTitle: {
    field: 'videoTitle',
    title: 'Video Title',
    paths: ['videoTitle'],
    divider: {
      isAvailable: false,
      isDefault: false,
    },
    filter: {
      isAvailable: true,
      isDefault: false,
      isDefaultCollapsed: true,
    },
  },
  videoType: {
    field: 'videoType',
    title: 'Video Type',
    paths: ['videoType'],
    divider: {
      isAvailable: false,
      isDefault: false,
    },
    filter: {
      isAvailable: true,
      isDefault: false,
      isDefaultCollapsed: true,
    },
  },
  videoEventType: {
    field: 'videoEventType',
    title: 'Video Event Type',
    paths: ['videoEventType'],
    divider: {
      isAvailable: false,
      isDefault: false,
    },
    filter: {
      isAvailable: true,
      isDefault: false,
      isDefaultCollapsed: true,
    },
  },
  videoId: {
    field: 'videoId',
    title: 'Video Id',
    paths: ['videoId'],
    divider: {
      isAvailable: false,
      isDefault: false,
    },
    filter: {
      isAvailable: false,
      isDefault: false,
      isDefaultCollapsed: true,
    },
  },
  duration: {
    field: 'duration',
    title: 'Duration',
    paths: ['duration'],
    divider: {
      isAvailable: false,
      isDefault: false,
    },
    filter: {
      isAvailable: false,
      isDefault: false,
      isDefaultCollapsed: true,
    },
  },
  videoPlayerReadyTime: {
    field: 'videoPlayerReadyTime',
    title: 'Video Player Ready Time',
    paths: ['videoPlayerReadyTime'],
    divider: {
      isAvailable: true,
      isDefault: false,
    },
    filter: {
      isAvailable: false,
      isDefault: false,
      isDefaultCollapsed: true,
    },
  },
  videoLoadTime: {
    field: 'videoLoadTime',
    title: 'Video Load Time',
    paths: ['videoLoadTime'],
    divider: {
      isAvailable: true,
      isDefault: false,
    },
    filter: {
      isAvailable: false,
      isDefault: false,
      isDefaultCollapsed: true,
    },
  },
  videoStartTime: {
    field: 'videoStartTime',
    title: 'Video Start Time',
    paths: ['videoStartTime'],
    divider: {
      isAvailable: true,
      isDefault: false,
    },
    filter: {
      isAvailable: false,
      isDefault: false,
      isDefaultCollapsed: true,
    },
  },
  videoSessionId: {
    field: 'videoSessionId',
    title: 'Video Session Id',
    paths: ['videoSessionId'],
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
  videoProgressType: {
    field: 'videoProgressType',
    title: 'Video Progress Type',
    paths: ['videoProgressType'],
    divider: {
      isAvailable: false,
      isDefault: false,
    },
    filter: {
      isAvailable: true,
      isDefault: false,
      isDefaultCollapsed: true,
    },
  },
  lastSentQuartile: {
    field: 'lastSentQuartile',
    title: 'Last Sent Quartile',
    paths: ['lastSentQuartile'],
    divider: {
      isAvailable: false,
      isDefault: false,
    },
    filter: {
      isAvailable: true,
      isDefault: false,
      isDefaultCollapsed: true,
    },
  },
  elapsedTime: {
    field: 'elapsedTime',
    title: 'Elapsed Time',
    paths: ['elapsedTime'],
    divider: {
      isAvailable: false,
      isDefault: false,
    },
    filter: {
      isAvailable: false,
      isDefault: false,
      isDefaultCollapsed: true,
    },
  },
  tags: {
    field: 'twTags',
    title: 'TWTags',
    paths: ['twTags'],
    divider: {
      isAvailable: false,
      isDefault: false,
    },
    filter: {
      isAvailable: true,
      isDefault: true,
      isDefaultCollapsed: true,
    },
  },
};
export default FIELD_DEF;

const FIELD_DEF_ARRAY = Object.values(FIELD_DEF);
export { FIELD_DEF_ARRAY };

// Utility engineCode to extract 'path' property values into a union engineCode
export type FieldNames = (typeof FIELD_DEF)[number]['field'];
export function getFieldNames(): FieldNames[] {
  return FIELD_DEF_ARRAY.map((f) => f.field);
}
export function getFieldDef(field: FieldNames): FieldDefinition | undefined {
  return FIELD_DEF_ARRAY.find((f) => f.field === field);
}
export function getDefaultFiltersFieldDefs(): FieldDefinition[] {
  const defs = FIELD_DEF_ARRAY.filter((f) => f.filter?.isDefault);
  // return ordered by default sort order
  return defs.sort((a, b) => {
    const aIdx = DEFAULT_FILTER_SORT_ORDER.indexOf(a.field) ?? 100;
    const bIdx = DEFAULT_FILTER_SORT_ORDER.indexOf(b.field) ?? 100;
    return aIdx - bIdx;
  });
}
export function getAllFiltersFieldDefs(): FieldDefinition[] {
  const defs = FIELD_DEF_ARRAY.filter((f) => f.filter?.isAvailable);
  // return ordered by default sort order
  return defs.sort((a, b) => {
    const aIdx = DEFAULT_FILTER_SORT_ORDER.indexOf(a.field) ?? 100;
    const bIdx = DEFAULT_FILTER_SORT_ORDER.indexOf(b.field) ?? 100;
    return aIdx - bIdx;
  });
}
export function getAllDividerFieldDefs(): FieldDefinition[] {
  return FIELD_DEF_ARRAY.filter((f) => f.divider?.isAvailable);
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

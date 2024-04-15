export function fieldDef(field: string) {
  return FIELD_DEF_ARRAY.find((f) => f.field === field);
}
const FIELD_DEF: { [key: string]: FieldDefinition } = {
  type: {
    field: 'type',
    title: 'Event Type',
    paths: ['type'],
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
    paths: ['clientEvent.vshErrorHexCode'],
    filter: {
      isAvailable: true,
      isDefault: false,
      isDefaultCollapsed: true,
    },
  },
  severity: {
    field: 'severity',
    title: 'Severity',
    paths: ['clientEvent.severity'],
    filter: {
      isAvailable: true,
      isDefault: false,
      isDefaultCollapsed: true,
    },
  },
  errorMessage: {
    field: 'errorMessage',
    title: 'Error Message',
    paths: ['clientEvent.errorMessage'],
    filter: {
      isAvailable: true,
      isDefault: false,
      isDefaultCollapsed: true,
    },
  },
  locationScene: {
    field: 'locationScene',
    title: 'Location Scene',
    paths: ['clientEvent.locationScene'],
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
    paths: ['clientEvent.hostAppName'],
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
    paths: ['clientEvent.visualEntityType'],
    filter: {
      isAvailable: true,
      isDefault: false,
      isDefaultCollapsed: true,
    },
  },
  interactAction: {
    field: 'interactAction',
    title: 'Interact Action',
    paths: ['clientEvent.interactAction'],
    filter: {
      isAvailable: true,
      isDefault: false,
      isDefaultCollapsed: true,
    },
  },
  interactCta: {
    field: 'interactCta',
    title: 'Interact CTA',
    paths: ['clientEvent.interactCta'],
    filter: {
      isAvailable: true,
      isDefault: false,
      isDefaultCollapsed: true,
    },
  },
  ctaSubType: {
    field: 'ctaSubType',
    title: 'CTA Sub Type',
    paths: ['clientEvent.ctaSubType'],
    filter: {
      isAvailable: true,
      isDefault: false,
      isDefaultCollapsed: true,
    },
  },
  searchTerm: {
    field: 'searchTerm',
    title: 'Search Term',
    paths: ['clientEvent.searchTerm'],
    filter: {
      isAvailable: false,
      isDefault: false,
      isDefaultCollapsed: true,
    },
  },
  strandName: {
    field: 'strandName',
    title: 'Strand Name',
    paths: ['clientEvent.strandName'],
    filter: {
      isAvailable: false,
      isDefault: false,
      isDefaultCollapsed: true,
    },
  },
  tilePosition: {
    field: 'tilePosition',
    title: 'Tile Position',
    paths: ['clientEvent.tilePosition'],
    filter: {
      isAvailable: false,
      isDefault: false,
      isDefaultCollapsed: true,
    },
  },
  tileContent: {
    field: 'tileContent',
    title: 'Tile Content',
    paths: ['clientEvent.tileContent'],
    filter: {
      isAvailable: false,
      isDefault: false,
      isDefaultCollapsed: true,
    },
  },
  tileFormat: {
    field: 'tileFormat',
    title: 'Tile Format',
    paths: ['clientEvent.tileFormat'],
    filter: {
      isAvailable: false,
      isDefault: false,
      isDefaultCollapsed: true,
    },
  },
  entryReferrerApplicationName: {
    field: 'entryReferrerApplicationName',
    title: 'Entry Ref. App Name',
    paths: ['clientEvent.entryReferrerApplicationName'],
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
    paths: ['clientEvent.referrerApplicationName'],
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
    paths: ['clientEvent.referrerScene'],
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
    paths: ['clientEvent.errorType'],
    filter: {
      isAvailable: true,
      isDefault: false,
      isDefaultCollapsed: true,
    },
  },
  errorSubType: {
    field: 'errorSubType',
    title: 'Error Sub Type',
    paths: ['clientEvent.errorSubType'],
    filter: {
      isAvailable: true,
      isDefault: false,
      isDefaultCollapsed: true,
    },
  },
  consoleSessionId: {
    field: 'consoleSessionId',
    title: 'Console Session ID',
    paths: ['dispatchedEvents[-1].inputEvent.consoleSessionId'],
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
    paths: ['dispatchedEvents[-1].inputEvent.openPsId'],
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
    paths: ['clientEvent.mobileFeatureArea'],
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
  // video
  videoTitle: {
    field: 'videoTitle',
    title: 'Video Title',
    paths: ['clientEvent.videoTitle'],
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
  videoType: {
    field: 'videoType',
    title: 'Video Type',
    paths: ['clientEvent.videoType'],
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
  videoEventType: {
    field: 'videoEventType',
    title: 'Video Event Type',
    paths: ['clientEvent.videoEventType'],
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
    paths: ['clientEvent.videoId'],
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
    paths: ['clientEvent.duration'],
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
    paths: ['clientEvent.videoPlayerReadyTime'],
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
  videoLoadTime: {
    field: 'videoLoadTime',
    title: 'Video Load Time',
    paths: ['clientEvent.videoLoadTime'],
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
  videoStartTime: {
    field: 'videoStartTime',
    title: 'Video Start Time',
    paths: ['clientEvent.videoStartTime'],
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
  videoSessionId: {
    field: 'videoSessionId',
    title: 'Video Session Id',
    paths: ['clientEvent.videoSessionId'],
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
    paths: ['clientEvent.videoProgressType'],
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
    paths: ['clientEvent.lastSentQuartile'],
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
    paths: ['clientEvent.elapsedTime'],
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
};
export default FIELD_DEF;

const FIELD_DEF_ARRAY = Object.values(FIELD_DEF);
export { FIELD_DEF_ARRAY };

// Utility type to extract 'field' property values into a union type
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

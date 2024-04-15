import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {} from '@redux-devtools/extension';
import TelemetryFilter from '@pages/telemetry-viewer-page/classes/TelemetryFilter.ts';
import { actionAddEvents } from '@pages/telemetry-viewer-page/store/actions/actionAddEvents.ts';
import { actionActivateFilterValues } from '@pages/telemetry-viewer-page/store/actions/actionActivateFilterValues.ts';
import {
  getAllFiltersFieldDefs,
  getDefaultFiltersFieldDefs,
} from '@pages/telemetry-viewer-page/constants/FIELD_DEF.ts';
import { actionSetFilters } from '@pages/telemetry-viewer-page/store/actions/actionSetFilters.ts';
import getDisplayableEvents from '@pages/telemetry-viewer-page/store/utils/getDisplayableEvents.ts';
import { actionSetAllEvents } from '@pages/telemetry-viewer-page/store/actions/actionSetAllEvents.ts'; // required for devtools typing

export interface StoreAction {
  state: TelemetryStore;
}
export interface TelemetryStore {
  useMockData: boolean;
  displayEvents: TVEvent[];
  clearDisplayEvents: () => void;
  allEvents: TVEvent[];
  addEvents: (events: TVEvent[]) => void;
  clearAllEvents: () => void;
  setAllEvents: (events: TVEvent[]) => void;
  deleteAllEventsBefore: (event: TVEvent) => void;
  deleteAllEventsAfter: (event: TVEvent) => void;
  maxEventCount: number;
  maxDisplayEventCount: number;
  setMaxDisplayEventCount: (value: number) => void;
  allowWrap: boolean;
  setAllowWrap: (allowWrap: boolean) => void;
  filters: TelemetryFilter[];
  setFilters: (filters: TelemetryFilter[]) => void;
  clearFilterValues: () => void;
  republishFilters: () => void;
  setActiveFilterValues: (filterType: FilterType, values: string[]) => void;
  eventTypeFilter: string[];
  setEventTypeFilter: (eventCodeFilter: string[]) => void;
  eventForDetails: TVEvent | null;
  setEventForDetails: (event: TVEvent | null) => void;
  appBarHeight: number;
  setAppBarHeight: (height: number) => void;
  tokenColorMode: TokenColorMode;
  setTokenColorMode: (colorMode: TokenColorMode) => void;
  tokenFontSize: number;
  setTokenFontSize: (fontSize: number) => void;
  tokenWidth: TokenWidth;
  setTokenWidth: (tokenWidth: TokenWidth) => void;
  tokenMode: TokenMode;
  setTokenMode: (tokenMode: TokenMode) => void;
  dividerFields: string[];
  setDividerFields: (dividerFields: string[]) => void;

  // IMPORT / EXPORT
  importingEvents: TVEvent[] | null;
  setImportingEvents: (events: TVEvent[]) => void;
  isImportDialogOpen: boolean;
  setIsImportDialogOpen: (isImportDialogOpen: boolean) => void;
  isExportDialogOpen: boolean;
  setIsExportDialogOpen: (isExportDialogOpen: boolean) => void;

  // MAIN BODY
  isFilterDrawerOpen: boolean;
  setIsFilterDrawerOpen: (isFilterDrawerOpen: boolean) => void;

  // SETTINGS DIALOG
  isSettingsDialogOpen: boolean;
  setIsSettingsDialogOpen: (isSettingsDialogOpen: boolean) => void;

  // CONNECTION SETTINGS
  cnxIpAddress: string | null;
  setCnxIpAddress: (ipAddress: string | null) => void;
  cnxPlatform: ConnectionPlatform;
  setCnxPlatform: (platform: ConnectionPlatform) => void;
  // TCx Options
  isConnectedViaTCx: boolean;
  setConnectedViaTCx: (isConnectedViaTCx: boolean) => void;
  connectToTCxName: string | null;
  setConnectToTCxName: (connectToTCxName: string | null) => void;

  // DISPLAY SETTINGS
  shouldShowTime: boolean;
  setShouldShowTime: (shouldShowTime: boolean) => void;
  shouldShowFlags: boolean;
  setShouldShowFlags: (shouldShowFlags: boolean) => void;
}

const useTelemetryStore = create<TelemetryStore>()(
  persist(
    (set) => ({
      useMockData: true,
      displayEvents: [],
      clearDisplayEvents: () => set({ displayEvents: [], allEvents: [] }),
      allEvents: [],
      addEvents: (events: TVEvent[]) =>
        set((state) => actionAddEvents({ state, events })),
      clearAllEvents: () =>
        set((state) => actionSetAllEvents({ state, events: [] })),
      setAllEvents: (events: TVEvent[]) =>
        set((state) => actionSetAllEvents({ state, events })),
      deleteAllEventsBefore: (event: TVEvent) =>
        set((state) =>
          actionSetAllEvents({
            state,
            events: state.allEvents.filter((e) => e.timeMs >= event.timeMs),
          }),
        ),
      deleteAllEventsAfter: (event: TVEvent) =>
        set((state) =>
          actionSetAllEvents({
            state,
            events: state.allEvents.filter((e) => e.timeMs <= event.timeMs),
          }),
        ),
      maxEventCount: 10000,
      maxDisplayEventCount: 1000,
      setMaxDisplayEventCount: (value: number) =>
        set({ maxDisplayEventCount: value }),
      allowWrap: false,
      setAllowWrap: (allowWrap: boolean) => set({ allowWrap }),
      filters: initializeFilters(),
      setFilters: (filters: TelemetryFilter[]) =>
        set((state) => actionSetFilters({ state, filters: [...filters] })),
      clearFilterValues: () => {
        set((state) => {
          state.filters.forEach((filter) => filter.clearValues());
          return {
            filters: [...state.filters],
            displayEvents: [],
          };
        });
      },
      setActiveFilterValues: (filterType: FilterType, values: string[]) =>
        set((state) =>
          actionActivateFilterValues({ state, filterType, values }),
        ),
      republishFilters: () =>
        set((state) => {
          return {
            filters: [...state.filters],
            displayEvents: [
              ...getDisplayableEvents(state.allEvents, state.filters),
            ],
          };
        }),
      eventTypeFilter: [],
      setEventTypeFilter: (eventTypeFilter: string[]) =>
        set({ eventTypeFilter: [...eventTypeFilter] }),
      eventForDetails: null,
      setEventForDetails: (event: TVEvent | null) =>
        set({ eventForDetails: event }),
      appBarHeight: 0,
      setAppBarHeight: (height: number) => set({ appBarHeight: height }),
      tokenColorMode: 'dual',
      setTokenColorMode: (tokenColorMode: TokenColorMode) =>
        set({ tokenColorMode }),
      tokenFontSize: 1,
      setTokenFontSize: (tokenFontSize: number) => set({ tokenFontSize }),
      tokenWidth: 'max',
      setTokenWidth: (tokenWidth: TokenWidth) => set({ tokenWidth }),
      tokenMode: 'details',
      setTokenMode: (tokenMode: TokenMode) => set({ tokenMode }),
      dividerFields: initializeDividerFields(),
      setDividerFields: (dividerFields: string[]) =>
        set({ dividerFields: [...dividerFields] }),

      // IMPORT / EXPORT
      importingEvents: null,
      setImportingEvents: (events: TVEvent[] | null) =>
        set({ importingEvents: events, isImportDialogOpen: !!events }),
      isImportDialogOpen: false,
      setIsImportDialogOpen: (isImportDialogOpen: boolean) =>
        set({ isImportDialogOpen, importingEvents: null }),
      isExportDialogOpen: false,
      setIsExportDialogOpen: (isExportDialogOpen: boolean) =>
        set({ isExportDialogOpen }),

      // MAIN BODY
      isFilterDrawerOpen: true,
      setIsFilterDrawerOpen: (isFilterDrawerOpen: boolean) =>
        set({ isFilterDrawerOpen }),

      // SETTINGS DIALOG
      isSettingsDialogOpen: true,
      setIsSettingsDialogOpen: (isSettingsDialogOpen: boolean) =>
        set({ isSettingsDialogOpen }),

      // CONNECTION SETTINGS
      cnxIpAddress: '1.1.1.1',
      setCnxIpAddress: (ipAddress: string | null) =>
        set({ cnxIpAddress: ipAddress }),
      cnxPlatform: 'Mock',
      setCnxPlatform: (platform: ConnectionPlatform) =>
        set({ cnxPlatform: platform }),
      // TCx Options
      isConnectedViaTCx: false,
      setConnectedViaTCx: (isConnectedViaTCx: boolean) =>
        set({ isConnectedViaTCx }),
      connectToTCxName: null,
      setConnectToTCxName: (connectToTCxName: string | null) =>
        set({ connectToTCxName }),

      // DISPLAY SETTINGS
      shouldShowTime: true,
      setShouldShowTime: (shouldShowTime: boolean) => set({ shouldShowTime }),
      shouldShowFlags: true,
      setShouldShowFlags: (shouldShowFlags: boolean) =>
        set({ shouldShowFlags }),
    }),
    {
      name: 'telemetry-store',
      // filter what fields to persist
      partialize: (state) => {
        return {
          __filter_fields: state.filters.map((f) => ({
            field: f.field,
            isCollapsed: f.collapsed,
          })),
          __divider_fields: state.dividerFields ?? [],
        };
      },
    },
  ),
);
interface SavedTelemetryStore {
  __filter_fields: { field: string; isCollapsed: boolean }[];
  __divider_fields: string[];
}
export default useTelemetryStore;
function initializeFilters() {
  const savedStore = getSavedStore();
  const savedFilterFields = savedStore.__filter_fields || [];

  // SAVED
  if (savedFilterFields.length > 0) {
    return savedFilterFields
      .map((savedFieldDef) => {
        const fieldDef = getAllFiltersFieldDefs().find(
          (f) => f.field === savedFieldDef.field,
        );
        if (!fieldDef) return null;
        const def = new TelemetryFilter(fieldDef);
        def.collapsed = savedFieldDef.isCollapsed;
        return def;
      })
      .filter((f) => f) as TelemetryFilter[];
  }

  // DEFAULTS
  return getDefaultFiltersFieldDefs().map(
    (fieldDef) => new TelemetryFilter(fieldDef),
  );
}
function initializeDividerFields() {
  return getSavedStore().__divider_fields || [];
}
function getSavedStore(): SavedTelemetryStore {
  const savedStore = JSON.parse(
    localStorage.getItem('telemetry-store') || '{}',
  ) as { state: SavedTelemetryStore };
  return savedStore.state || {};
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - forcing the store to global reference
window['telemetryStore'] = useTelemetryStore;
console.warn(
  "The store is externalized for development mode under the name 'megaStore' here.\n\n Try `telemetryStore.getState()` to browse.",
);

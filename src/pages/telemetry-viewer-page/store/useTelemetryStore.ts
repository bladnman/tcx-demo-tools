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
import getDisplayableEvents from '@pages/telemetry-viewer-page/store/utils/getDisplayableEvents.ts'; // required for devtools typing

export interface StoreAction {
  state: TelemetryStore;
}
export interface TelemetryStore {
  displayEvents: TVEvent[];
  clearDisplayEvents: () => void;
  allEvents: TVEvent[];
  addEvents: (events: TVEvent[]) => void;
  maxEventCount: number;
  allowWrap: boolean;
  setAllowWrap: (allowWrap: boolean) => void;
  filters: TelemetryFilter[];
  setFilters: (filters: TelemetryFilter[]) => void;
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

  // MAIN BODY
  isFilterDrawerOpen: boolean;
  setIsFilterDrawerOpen: (isFilterDrawerOpen: boolean) => void;

  // TCx Options
  isConnectedViaTCx: boolean;
  setConnectedViaTCx: (isConnectedViaTCx: boolean) => void;
  connectToTCxName: string | null;
  setConnectToTCxName: (connectToTCxName: string | null) => void;
}

const useTelemetryStore = create<TelemetryStore>()(
  persist(
    (set) => ({
      displayEvents: [],
      clearDisplayEvents: () => set({ displayEvents: [] }),
      allEvents: [],
      addEvents: (events: TVEvent[]) =>
        set((state) => actionAddEvents({ state, events })),
      maxEventCount: 10000,
      allowWrap: false,
      setAllowWrap: (allowWrap: boolean) => set({ allowWrap }),
      filters: initializeFilters(),
      setFilters: (filters: TelemetryFilter[]) =>
        set((state) => actionSetFilters({ state, filters: [...filters] })),
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
      tokenWidth: 'min',
      setTokenWidth: (tokenWidth: TokenWidth) => set({ tokenWidth }),
      tokenMode: 'details',
      setTokenMode: (tokenMode: TokenMode) => set({ tokenMode }),
      dividerFields: initializeDividerFields(),
      setDividerFields: (dividerFields: string[]) =>
        set({ dividerFields: [...dividerFields] }),

      // MAIN BODY
      isFilterDrawerOpen: true,
      setIsFilterDrawerOpen: (isFilterDrawerOpen: boolean) =>
        set({ isFilterDrawerOpen }),

      // TCx Options
      isConnectedViaTCx: false,
      setConnectedViaTCx: (isConnectedViaTCx: boolean) =>
        set({ isConnectedViaTCx }),
      connectToTCxName: 'TDServer',
      setConnectToTCxName: (connectToTCxName: string | null) =>
        set({ connectToTCxName }),
    }),
    {
      name: 'telemetry-store',
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

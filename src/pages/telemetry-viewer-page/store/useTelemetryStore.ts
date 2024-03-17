import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type {} from '@redux-devtools/extension';
import TelemetryFilter from '@pages/telemetry-viewer-page/utils/filter-utils/TelemetryFilter.ts';
import { actionAddEvents } from '@pages/telemetry-viewer-page/store/actions/actionAddEvents.ts';
import { actionActivateFilterValues } from '@pages/telemetry-viewer-page/store/actions/actionActivateFilterValues.ts';
import { actionSaveFilters } from '@pages/telemetry-viewer-page/store/actions/actionSaveFilters.ts';
import { EVENT_FILTER_TYPE } from '@pages/telemetry-viewer-page/utils/TELEM_CONST.ts'; // required for devtools typing

export interface StoreAction {
  state: TelemetryStore;
}
export interface TelemetryStore {
  displayEvents: TelemetryEventMessage[];
  clearDisplayEvents: () => void;
  allEvents: TelemetryEventMessage[];
  addEvents: (events: TelemetryEventMessage[]) => void;
  maxEventCount: number;
  allowWrap: boolean;
  setAllowWrap: (allowWrap: boolean) => void;
  filters: TelemetryFilter[];
  setFilters: (filters: TelemetryFilter[]) => void;
  republishFilters: () => void;
  setActiveFilterValues: (filterType: FilterType, values: string[]) => void;
  eventTypeFilter: string[];
  setEventTypeFilter: (eventCodeFilter: string[]) => void;
  eventForDetails: TelemetryEventMessage | null;
  setEventForDetails: (event: TelemetryEventMessage | null) => void;
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

  // MAIN BODY
  isFilterDrawerOpen: boolean;
  setIsFilterDrawerOpen: (isFilterDrawerOpen: boolean) => void;
}

const useTelemetryStore = create<TelemetryStore>()(
  devtools((set) => ({
    displayEvents: [],
    clearDisplayEvents: () => set({ displayEvents: [] }),
    allEvents: [],
    addEvents: (events: TelemetryEventMessage[]) =>
      set((state) => actionAddEvents({ state, events })),
    maxEventCount: 10000,
    allowWrap: false,
    setAllowWrap: (allowWrap: boolean) => set({ allowWrap }),
    filters: EVENT_FILTER_TYPE.map((def) => new TelemetryFilter(def)),
    setFilters: (filters: TelemetryFilter[]) => set({ filters }),
    setActiveFilterValues: (filterType: FilterType, values: string[]) =>
      set((state) => actionActivateFilterValues({ state, filterType, values })),
    republishFilters: () => set((state) => actionSaveFilters({ state })),
    eventTypeFilter: [],
    setEventTypeFilter: (eventTypeFilter: string[]) => set({ eventTypeFilter }),
    eventForDetails: null,
    setEventForDetails: (event: TelemetryEventMessage | null) =>
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

    // MAIN BODY
    isFilterDrawerOpen: true,
    setIsFilterDrawerOpen: (isFilterDrawerOpen: boolean) =>
      set({ isFilterDrawerOpen }),
  })),
);
export default useTelemetryStore;

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import initializeTagConfigs from '@pages/telemetry-viewer-page/store/settings-store/utils/initializeTagConfigs.ts';

export interface StoreAction {
  state: SettingsStore;
}

/**
 * Settings Store
 *
 * See store/README.md for more information.
 *
 * Keep actions external to the store. This should be a pure store.
 */

export interface SettingsStore {
  maxDisplayEventCount: number;
  allowWrap: boolean;
  eventForDetails: TVEvent | null;
  appBarHeight: number;
  tokenColorMode: TokenColorMode;
  tokenFontSize: number;
  tokenWidth: TokenWidth;
  tokenMode: TokenMode;
  dividerFields: string[];
  importingEvents: TVEvent[] | null;
  isImportDialogOpen: boolean;
  isImportingData: boolean;
  isExportDialogOpen: boolean;
  isFilterDrawerOpen: boolean;
  isSettingsDialogOpen: boolean;
  cnxIpAddress: string | null;
  cnxPlatform: ConnectionPlatform;
  isConnectedViaTCx: boolean;
  connectToTCxName: string | null;
  shouldShowTime: boolean;
  shouldShowFlags: boolean;
  mockBatchSize: number;
  tagConfigs: TagConfig[];
}

const useSettingsStore = create<SettingsStore>()(
  persist(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (_set) => ({
      maxDisplayEventCount: 1000,
      allowWrap: false,
      eventForDetails: null,
      appBarHeight: 0,
      tokenColorMode: 'dual',
      tokenFontSize: 1,
      tokenWidth: 'max',
      tokenMode: 'details',
      dividerFields: initializeDividerFields(),
      importingEvents: null,
      isImportDialogOpen: false,
      isImportingData: false,
      isExportDialogOpen: false,
      isFilterDrawerOpen: true,
      isSettingsDialogOpen: true,
      cnxIpAddress: '1.1.1.1',
      cnxPlatform: 'Mock',
      isConnectedViaTCx: false,
      connectToTCxName: null,
      shouldShowTime: true,
      shouldShowFlags: true,
      mockBatchSize: 10,
      tagConfigs: initializeTagConfigs(getSavedStore()),
    }),
    {
      name: 'settings-store',
      // filter what fields to persist
      partialize: (state) => {
        return {
          __divider_fields: state.dividerFields ?? [],
          __tag_configs: state.tagConfigs.filter((config) => config.updatedDateMs) ?? [],
        };
      },
    },
  ),
);
export interface SavedSettingsStore {
  __divider_fields: string[];
  __tag_configs: TagConfig[];
}
export default useSettingsStore;
function initializeDividerFields() {
  return getSavedStore().__divider_fields || [];
}
function getSavedStore(): SavedSettingsStore {
  const savedStore = JSON.parse(localStorage.getItem('settings-store') || '{}') as {
    state: SavedSettingsStore;
  };
  return savedStore.state || {};
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - forcing the store to global reference
window['settingsStore'] = useSettingsStore;
console.warn(
  "The store is externalized for development mode under the name 'settingsStore' here.\n\n Try `settingsStore.getState()` to browse.",
);

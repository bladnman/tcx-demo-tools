import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
  isExportDialogOpen: boolean;
  isFilterDrawerOpen: boolean;
  isSettingsDialogOpen: boolean;
  cnxIpAddress: string | null;
  cnxPlatform: ConnectionPlatform;
  isConnectedViaTCx: boolean;
  connectToTCxName: string | null;
  shouldShowTime: boolean;
  shouldShowFlags: boolean;
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
      isExportDialogOpen: false,
      isFilterDrawerOpen: true,
      isSettingsDialogOpen: true,
      cnxIpAddress: '1.1.1.1',
      cnxPlatform: 'Mock',
      isConnectedViaTCx: false,
      connectToTCxName: null,
      shouldShowTime: true,
      shouldShowFlags: true,
    }),
    {
      name: 'telemetry-store',
      // filter what fields to persist
      partialize: (state) => {
        return {
          __divider_fields: state.dividerFields ?? [],
        };
      },
    },
  ),
);
interface SavedSettingsStore {
  __divider_fields: string[];
}
export default useSettingsStore;
function initializeDividerFields() {
  return getSavedStore().__divider_fields || [];
}
function getSavedStore(): SavedSettingsStore {
  const savedStore = JSON.parse(localStorage.getItem('settings-store') || '{}') as { state: SavedSettingsStore };
  return savedStore.state || {};
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - forcing the store to global reference
window['settingsStore'] = useSettingsStore;
console.warn(
  "The store is externalized for development mode under the name 'settingsStore' here.\n\n Try `settingsStore.getState()` to browse.",
);

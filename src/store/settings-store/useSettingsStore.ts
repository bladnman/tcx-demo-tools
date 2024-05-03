import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import initializeTagConfigs from '@store/settings-store/utils/initializeTagConfigs.ts';

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
  appBarHeight: number;
  isSettingsDialogOpen: boolean;
  filterMode: 'AND' | 'OR';

  // event display settings
  tokenColorMode: TokenColorMode;
  tokenFontSize: number;
  tokenWidth: TokenWidth;
  tokenMode: TokenMode;
  shouldShowTime: boolean;
  allowWrap: boolean;

  // connection settings
  cnxIpAddress: string | null;
  cnxPlatform: ConnectionPlatform;
  isConnectedViaTCx: boolean;
  connectToTCxName: string | null;

  // mock settings
  mockBatchSize: number;
  mockBatchDelayMs: number;
  mockAutoPause: boolean;
  mockIsPaused: boolean;

  // import/export features
  importingEvents: TVEvent[] | null;
  importingSequences: Sequences | null;
  isImportDialogOpen: boolean;
  isImportingData: boolean;
  isExportDialogOpen: boolean;

  // tag settings
  isTagEditorDialogOpen: boolean;
  tagConfigs: TagConfig[];
  tagKeyForEdit: string | null;

  // timeline features
  isFilterDrawerOpen: boolean;
  dividerFields: string[];
}

const useSettingsStore = create<SettingsStore>()(
  persist(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (_set) => ({
      maxDisplayEventCount: 1000,
      appBarHeight: 0,
      isSettingsDialogOpen: false,
      filterMode: 'AND',

      // event display settings
      tokenColorMode: 'dual',
      tokenFontSize: 1,
      tokenWidth: 'max',
      tokenMode: 'details',
      shouldShowTime: true,
      allowWrap: false,

      // connection settings
      cnxIpAddress: '1.1.1.1',
      // cnxPlatform: 'TD Server',
      cnxPlatform: 'Mock',
      isConnectedViaTCx: false,
      connectToTCxName: null,

      // mock settings
      mockBatchSize: 30,
      mockBatchDelayMs: 100,
      mockAutoPause: true,
      mockIsPaused: true,

      // import/export features
      importingEvents: null,
      importingSequences: null,
      isImportDialogOpen: false,
      isImportingData: false,
      isExportDialogOpen: false,

      // tag settings
      isTagEditorDialogOpen: true,
      tagConfigs: initializeTagConfigs(getSavedStore()),
      tagKeyForEdit: null, // CONST.NEW_TAG_KEY is a special key for creating a new tag

      // timeline features
      isFilterDrawerOpen: true,
      dividerFields: initializeDividerFields(),
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

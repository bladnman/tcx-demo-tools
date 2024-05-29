import TWEvent from '@classes/data/TWEvent.ts';
import initializeTagConfigs from '@store/settings-store/utils/initializeTagConfigs.ts';
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
  importingEvents: TWEvent[] | null;
  importingSequences: Sequences | null;
  isImportDialogOpen: boolean;
  isImportingData: boolean;
  isExportDialogOpen: boolean;
  isMerlinImportDialogOpen: boolean;

  // tag settings
  isTagEditorDialogOpen: boolean;
  tagConfigs: TagConfig[];
  tagKeyForEdit: string | null;

  // timeline features
  isFilterDrawerOpen: boolean;
  dividerFields: string[];

  // sequences features
  activeSequence: SequenceType;
  selectedSequence: Sequence | null;

  // details features
  detailsActiveTab: DetailsTab;
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
      cnxPlatform: 'TwizService',
      // cnxPlatform: 'TD Server',
      // cnxPlatform: 'Mock',
      isConnectedViaTCx: false,
      connectToTCxName: null,

      // mock settings
      mockBatchSize: 2,
      mockBatchDelayMs: 300,
      mockAutoPause: false,
      mockIsPaused: true,

      // import/export features
      importingEvents: null,
      importingSequences: null,
      isImportDialogOpen: false,
      isImportingData: false,
      isExportDialogOpen: false,
      isMerlinImportDialogOpen: false,

      // tag settings
      isTagEditorDialogOpen: true,
      tagConfigs: initializeTagConfigs(getSavedStore()),
      tagKeyForEdit: null, // CONST.NEW_TAG_KEY is a special key for creating a new tag

      // timeline features
      isFilterDrawerOpen: true,
      dividerFields: initializeDividerFields(),

      // sequences features
      activeSequence: 'appInstance',
      selectedSequence: null,

      // details features
      detailsActiveTab: 'Summary',
    }),
    {
      name: 'settings-store',
      // filter what fields to persist
      partialize: (state) => {
        return {
          __divider_fields: state.dividerFields ?? [],
          __tag_configs: state.tagConfigs.filter((config) => config.updatedDateMs) ?? [],
          detailsActiveTab: state.detailsActiveTab,
        };
      },
    },
  ),
);
export interface SavedSettingsStore {
  __divider_fields: string[];
  __tag_configs: TagConfig[];
  detailsActiveTab: DetailsTab;
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
  "The store is externalized for development mode under the label 'settingsStore' here.\n\n Try `settingsStore.getState()` to browse.",
);

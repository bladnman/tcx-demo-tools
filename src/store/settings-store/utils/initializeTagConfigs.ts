import { SavedSettingsStore } from '@store/settings-store/useSettingsStore.ts';
import { TAG_CONFIG } from '@const/TAG_CONFIG.ts';

export default function initializeTagConfigs(
  savedStore: SavedSettingsStore,
): TagConfig[] {
  const savedConfigs = savedStore.__tag_configs || [];
  // start with the default tag configs
  const configs = [...TAG_CONFIG];

  // and then add or update any saved tag configs
  savedConfigs.reverse().forEach((savedConfig) => {
    const index = configs.findIndex((config) => config.key === savedConfig.key);
    // UPDATE
    if (index !== -1) {
      configs[index] = savedConfig;
    }
    // ADD
    else {
      configs.unshift(savedConfig);
    }
  });

  return configs;
}

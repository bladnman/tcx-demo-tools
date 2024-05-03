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
    const defaultConfig = configs.find((config) => config.key === savedConfig.key);

    // UPDATE - default config, only some data is used from saved config
    if (defaultConfig) {
      const validKeys = ['themeColor', 'icon', 'isActive'];
      validKeys.forEach((key) => {
        (defaultConfig as Hash)[key] = (savedConfig as Hash)[key];
      });
    }
    // ADD
    else {
      configs.unshift(savedConfig);
    }
  });

  return configs;
}

import useSettingsStore from '@store/settings-store/useSettingsStore.ts';

export default function isNewTagConfig(tagConfig?: TagConfig | null) {
  if (!tagConfig) return false;
  const { tagConfigs } = useSettingsStore.getState();
  return !tagConfigs.find((config) => config.uuid === tagConfig.uuid);
}

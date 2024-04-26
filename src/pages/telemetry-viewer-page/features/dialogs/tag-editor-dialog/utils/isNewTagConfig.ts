import useSettingsStore from '@pages/telemetry-viewer-page/store/settings-store/useSettingsStore.ts';

export default function isNewTagConfig(tagConfig?: TagConfig | null) {
  if (!tagConfig) return false;
  const { tagConfigs } = useSettingsStore.getState();
  return !tagConfigs.find((config) => config.uuid === tagConfig.uuid);
}

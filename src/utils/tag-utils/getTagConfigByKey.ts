import useSettingsStore from '@store/settings-store/useSettingsStore.ts';

export default function getTagConfigByKey(tagKey: string | null) {
  const { tagConfigs } = useSettingsStore.getState();
  if (!tagKey) return null;
  return tagConfigs.find((tagConfig) => tagConfig.key === tagKey) ?? null;
}

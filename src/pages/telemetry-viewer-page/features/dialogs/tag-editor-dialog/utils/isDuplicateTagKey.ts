import useSettingsStore from '@pages/telemetry-viewer-page/store/settings-store/useSettingsStore.ts';

/**
 * Check if a tag key is already in use.
 *
 * Note: This is not a perfect check, as it only checks the key against all
 * existing tag configs. It will find itself if this config already exists.
 * You will want to call this only for new keys.
 *
 */
export default function isDuplicateTagKey(key?: string | null) {
  if (!key) return false;
  const { tagConfigs } = useSettingsStore.getState();
  return !!tagConfigs.find((config) => config.key.toLowerCase() === key.toLowerCase());
}

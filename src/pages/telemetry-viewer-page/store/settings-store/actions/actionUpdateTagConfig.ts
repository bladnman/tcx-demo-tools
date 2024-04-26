import useSettingsStore from '@pages/telemetry-viewer-page/store/settings-store/useSettingsStore.ts';

/**
 *
 * `UPDATE` or `ADD` tag configs
 *
 * Used when you have changed a tag config in some way
 * (e.g. toggling, editing, etc.)
 *
 * Can also be used to "add" new tag configs to the store
 *
 * @param tagConfig
 */
export default function actionUpdateTagConfig(tagConfig: TagConfig) {
  const tagConfigs = useSettingsStore.getState().tagConfigs;
  tagConfig.updatedDateMs = Date.now();

  // does this tag already exist in the store?
  const index = tagConfigs.findIndex((config) => config.key === tagConfig.key);
  // UPDATE
  if (index !== -1) {
    tagConfigs[index] = tagConfig;
  }
  // ADD -- we are kind enough to also add the tag if it doesn't exist
  // adding to the front of the array
  else {
    tagConfigs.unshift(tagConfig);
  }
  useSettingsStore.setState({ tagConfigs: [...tagConfigs] });
}

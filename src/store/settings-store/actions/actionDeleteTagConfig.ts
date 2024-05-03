import useSettingsStore from '@store/settings-store/useSettingsStore.ts';

/**
 * `DELETE` tag configs
 * @param tagConfig
 */
export default function actionDeleteTagConfig(tagConfig: TagConfig) {
  const tagConfigs = useSettingsStore.getState().tagConfigs;
  useSettingsStore.setState({
    tagConfigs: [...tagConfigs.filter((tempConfig) => tempConfig !== tagConfig)],
  });
}

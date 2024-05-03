import useSettingsStore from '@store/settings-store/useSettingsStore.ts';

export default function actionSetTagConfigs(tagConfigs: TagConfig[]) {
  useSettingsStore.setState({ tagConfigs: [...tagConfigs] });
}

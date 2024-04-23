import useSettingsStore from '@pages/telemetry-viewer-page/store/settings-store/useSettingsStore.ts';

export default function actionSetTagConfigs(tagConfigs: TagConfig[]) {
  useSettingsStore.setState({ tagConfigs: [...tagConfigs] });
}

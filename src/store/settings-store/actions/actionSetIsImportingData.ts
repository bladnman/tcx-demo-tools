import useSettingsStore from '@store/settings-store/useSettingsStore.ts';

export default function actionSetIsImportingData(isImportingData: boolean) {
  useSettingsStore.setState({ isImportingData });
}

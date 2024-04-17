import useSettingsStore from '@pages/telemetry-viewer-page/store/settings-store/useSettingsStore.ts';

export default function actionSetIsFilterDrawerOpen(isFilterDrawerOpen: boolean) {
  useSettingsStore.setState({ isFilterDrawerOpen });
}

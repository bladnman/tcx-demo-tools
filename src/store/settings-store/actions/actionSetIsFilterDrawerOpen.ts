import useSettingsStore from '@store/settings-store/useSettingsStore.ts';

export default function actionSetIsFilterDrawerOpen(isFilterDrawerOpen: boolean) {
  useSettingsStore.setState({ isFilterDrawerOpen });
}

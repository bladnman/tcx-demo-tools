import useSettingsStore from '@store/settings-store/useSettingsStore.ts';

export default function actionSetShouldShowTime(shouldShowTime: boolean) {
  useSettingsStore.setState({ shouldShowTime });
}

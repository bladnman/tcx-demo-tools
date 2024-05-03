import useSettingsStore from '@store/settings-store/useSettingsStore.ts';

export default function actionSetAllowWrap(allowWrap: boolean) {
  useSettingsStore.setState({ allowWrap });
}

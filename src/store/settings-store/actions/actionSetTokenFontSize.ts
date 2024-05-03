import useSettingsStore from '@store/settings-store/useSettingsStore.ts';

export default function actionSetTokenFontSize(tokenFontSize: number) {
  useSettingsStore.setState({ tokenFontSize });
}

import useSettingsStore from '@store/settings-store/useSettingsStore.ts';

export default function actionSetTokenColorMode(tokenColorMode: TokenColorMode) {
  useSettingsStore.setState({ tokenColorMode });
}

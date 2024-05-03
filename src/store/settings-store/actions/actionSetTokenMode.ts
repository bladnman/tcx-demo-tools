import useSettingsStore from '../useSettingsStore.ts';

export default function actionSetTokenMode(tokenMode: TokenMode) {
  useSettingsStore.setState({ tokenMode });
}

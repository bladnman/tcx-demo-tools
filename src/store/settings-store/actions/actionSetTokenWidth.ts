import useSettingsStore from '../useSettingsStore.ts';

export default function actionSetTokenWidth(tokenWidth: TokenWidth) {
  useSettingsStore.setState({ tokenWidth });
}

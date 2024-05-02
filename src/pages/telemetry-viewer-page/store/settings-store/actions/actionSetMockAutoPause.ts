import useSettingsStore from '../useSettingsStore.ts';

export default function actionSetMockAutoPause(mockAutoPause: boolean) {
  useSettingsStore.setState({ mockAutoPause });
}

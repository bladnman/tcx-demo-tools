import useSettingsStore from '../useSettingsStore.ts';

export default function actionSetMockIsPaused(mockIsPaused: boolean) {
  useSettingsStore.setState({ mockIsPaused });
}

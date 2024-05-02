import useSettingsStore from '../useSettingsStore.ts';

export default function actionSetMockBatchDelayMs(mockBatchDelayMs: number) {
  useSettingsStore.setState({ mockBatchDelayMs });
}

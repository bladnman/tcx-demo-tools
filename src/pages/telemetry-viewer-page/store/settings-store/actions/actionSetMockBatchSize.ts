import useSettingsStore from '../useSettingsStore.ts';

export default function actionSetMockBatchSize(mockBatchSize: number) {
  useSettingsStore.setState({ mockBatchSize });
}

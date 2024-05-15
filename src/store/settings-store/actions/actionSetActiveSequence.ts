import useSettingsStore from '../useSettingsStore.ts';

export default function actionSetActiveSequence(activeSequence: SequenceType) {
  useSettingsStore.setState({ activeSequence });
}

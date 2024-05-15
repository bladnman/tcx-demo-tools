import useSettingsStore from '@store/settings-store/useSettingsStore.ts';

export default function actionSetSelectedSequence(selectedSequence: Sequence | null) {
  useSettingsStore.setState({ selectedSequence });
}

import useSettingsStore from '@store/settings-store/useSettingsStore.ts';

export default function actionSetFilterMode(filterMode: 'AND' | 'OR' = 'AND') {
  useSettingsStore.setState({ filterMode });
}

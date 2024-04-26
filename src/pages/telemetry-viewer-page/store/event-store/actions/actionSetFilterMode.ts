import useSettingsStore from '@pages/telemetry-viewer-page/store/settings-store/useSettingsStore.ts';

export default function actionSetFilterMode(filterMode: 'AND' | 'OR' = 'AND') {
  useSettingsStore.setState({ filterMode });
}

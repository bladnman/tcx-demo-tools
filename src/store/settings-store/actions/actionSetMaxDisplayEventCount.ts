import useSettingsStore from '@store/settings-store/useSettingsStore.ts';

export default function actionSetMaxDisplayEventCount(value: number) {
  useSettingsStore.setState({ maxDisplayEventCount: value });
}

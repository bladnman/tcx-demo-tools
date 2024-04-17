import useSettingsStore from '@pages/telemetry-viewer-page/store/settings-store/useSettingsStore.ts';

export default function actionSetIsSettingsDialogOpen(isSettingsDialogOpen: boolean) {
  useSettingsStore.setState({ isSettingsDialogOpen });
}

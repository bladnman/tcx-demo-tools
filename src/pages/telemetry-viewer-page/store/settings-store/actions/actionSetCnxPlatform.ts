import useSettingsStore from '@pages/telemetry-viewer-page/store/settings-store/useSettingsStore.ts';

export default function actionSetCnxPlatform(platform: ConnectionPlatform) {
  useSettingsStore.setState({ cnxPlatform: platform });
}

import useSettingsStore from '@pages/telemetry-viewer-page/store/settings-store/useSettingsStore.ts';

export function actionSetConnectToTcxName(cnxPlatform: ConnectionPlatform) {
  // TODO: build proper connectToTCxName
  const connectToTCxName =
    cnxPlatform === 'TD Server'
      ? 'TDServer'
      : cnxPlatform === 'Mobile'
        ? 'MobileTelemetry'
        : 'Mock';

  useSettingsStore.setState({ connectToTCxName });
}

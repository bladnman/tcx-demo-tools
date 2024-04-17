import { StoreAction, SettingsStore } from '@pages/telemetry-viewer-page/store/settings-store/useSettingsStore.ts';

export function actionSetConnectToTcxName({ state }: StoreAction): Partial<SettingsStore> {
  const { cnxPlatform /*cnxIpAddress*/ } = state;

  // TODO: build proper connectToTCxName
  const connectToTCxName =
    cnxPlatform === 'TD Server' ? 'TDServer' : cnxPlatform === 'Mobile' ? 'MobileTelemetry' : 'Mock';

  return {
    connectToTCxName,
  };
}

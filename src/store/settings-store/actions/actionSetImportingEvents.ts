import useSettingsStore from '@store/settings-store/useSettingsStore.ts';

export default function actionSetImportingEvents(events: TVEvent[] | null) {
  useSettingsStore.setState({
    importingEvents: events,
    isImportDialogOpen: !!events,
    isImportingData: false,
  });
}

import TWEvent from '@classes/data/TWEvent.ts';
import useSettingsStore from '@store/settings-store/useSettingsStore.ts';

export default function actionSetImportingEvents(events: TWEvent[] | null) {
  useSettingsStore.setState({
    importingEvents: events,
    isImportDialogOpen: !!events,
    isImportingData: false,
  });
}

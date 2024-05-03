import useSettingsStore from '@store/settings-store/useSettingsStore.ts';

export default function actionSetDetailsActiveTab(detailsActiveTab: DetailsTab) {
  useSettingsStore.setState({ detailsActiveTab });
}

import useSettingsStore from '@store/settings-store/useSettingsStore.ts';

export default function actionSetDividerFields(dividerFields: string[]) {
  useSettingsStore.setState({ dividerFields: [...dividerFields] });
}

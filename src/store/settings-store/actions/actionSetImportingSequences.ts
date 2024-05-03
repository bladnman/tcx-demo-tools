import useSettingsStore from '@store/settings-store/useSettingsStore.ts';

export default function actionSetImportingSequences(sequences: Sequences | null) {
  useSettingsStore.setState({
    importingSequences: sequences,
  });
  // TODO: testing 🐽
  if (sequences) {
    console.log(`[🐽](actionSetImportingSequences) IMPORTING sequences`, sequences);
  }
}

import useEventStore from '@pages/telemetry-viewer-page/store/event-store/useEventStore.ts';

export function actionSetSequences(sequences: Sequences) {
  useEventStore.setState({ sequences });
}

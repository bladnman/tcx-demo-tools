import useEventStore from '@store/event-store/useEventStore.ts';

export function actionSetSequences(sequences: Sequences) {
  useEventStore.setState({ sequences });
}

import TWEvent from '@classes/data/TWEvent.ts';
import useSummaryComponent from '@features/inspector-panel/features/details-summary-viewer/hooks/useSummaryComponent.ts';
import useSettingsStore from '@store/settings-store/useSettingsStore.ts';
import { useMemo } from 'react';

export default function useDetailTabs(event: TWEvent) {
  const detailsActiveTab = useSettingsStore((state) => state.detailsActiveTab);
  const hasNotes = event.hasFailures;
  const hasSummary = useSummaryComponent(event) !== null;
  return useMemo(() => {
    let tabIndex = 0;
    if (detailsActiveTab === 'Notes') {
      tabIndex = hasNotes ? 1 : 0;
    }
    return {
      tabIndex,
      isRawTab: tabIndex === 0,
      isNotesTab: tabIndex === 1,
      hasSummary,
    };
  }, [detailsActiveTab, hasNotes, hasSummary]);
}

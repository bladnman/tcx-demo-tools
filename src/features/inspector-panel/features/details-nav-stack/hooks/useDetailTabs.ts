import useSummaryComponent from '@features/inspector-panel/features/details-summary-viewer/hooks/useSummaryComponent.ts';
import useSettingsStore from '@store/settings-store/useSettingsStore.ts';
import { useMemo } from 'react';

export default function useDetailTabs(event: TVEvent) {
  const detailsActiveTab = useSettingsStore((state) => state.detailsActiveTab);
  const hasNotes = event.hasFailures;
  const hasSummary = useSummaryComponent(event) !== null;
  return useMemo(() => {
    let tabIndex = 2; // default to Raw
    if (detailsActiveTab === 'Summary') {
      tabIndex = hasSummary ? 0 : 2;
    } else if (detailsActiveTab === 'Notes') {
      tabIndex = hasNotes ? 1 : 2;
    }
    return {
      tabIndex,
      isRawTab: tabIndex === 2,
      isSummaryTab: tabIndex === 0,
      isNotesTab: tabIndex === 1,
      hasSummary,
    };
  }, [detailsActiveTab, hasNotes, hasSummary]);
}

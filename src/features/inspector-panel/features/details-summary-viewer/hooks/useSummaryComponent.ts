import SummaryAvatar from '@features/inspector-panel/features/details-summary-viewer/features/avatar/SummaryAvatar.tsx';
import SummaryImpression from '@features/inspector-panel/features/details-summary-viewer/features/impression/SummaryImpression.tsx';
import SummaryLoadTime from '@features/inspector-panel/features/details-summary-viewer/features/load-time/SummaryLoadTime.tsx';
import SummaryNavigation from '@features/inspector-panel/features/details-summary-viewer/features/navigation/SummaryNavigation.tsx';
import SummaryTraceSpan from '@features/inspector-panel/features/details-summary-viewer/features/trace-span/SummaryTraceSpan.tsx';
import SummaryVideoStream from '@features/inspector-panel/features/details-summary-viewer/features/video-stream/SummaryVideoStream.tsx';
import React, { useMemo } from 'react';

type SummaryComponentProps = {
  event: TVEvent;
};
type SummaryComponentType = React.ComponentType<SummaryComponentProps>;
export default function useSummaryComponent(event: TVEvent) {
  return useMemo(() => {
    switch (event.type) {
      case 'ViewableImpression':
        return SummaryImpression as SummaryComponentType;
      case 'Navigation':
        return SummaryNavigation as SummaryComponentType;
      case 'LoadTime':
        return SummaryLoadTime as SummaryComponentType;
      case 'VideoStream':
        return SummaryVideoStream as SummaryComponentType;
      case 'TraceSpan':
        return SummaryTraceSpan as SummaryComponentType;
      case 'AvatarImageLoad':
        return SummaryAvatar as SummaryComponentType;
      default:
        return null;
    }
  }, [event.type]);
}

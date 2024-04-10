import React from 'react';
import SummaryImpression from '@pages/telemetry-viewer-page/features/right-drawer/features/details-summary-viewer/features/SummaryImpression.tsx';
import { VStack } from '@common/mui-stacks.tsx';
import SummaryNavigation from '@pages/telemetry-viewer-page/features/right-drawer/features/details-summary-viewer/features/navigation/SummaryNavigation.tsx';
import SummaryLoadTime from '@pages/telemetry-viewer-page/features/right-drawer/features/details-summary-viewer/features/load-time/SummaryLoadTime.tsx';

type SummaryComponentProps = {
  event: TVEvent;
};
type SummaryComponentType = React.ComponentType<SummaryComponentProps>;

export default function DetailsSummaryViewer({ event }: { event: TVEvent }) {
  let SummaryComponent: SummaryComponentType | null = null;
  switch (event.type) {
    case 'ViewableImpression':
      SummaryComponent = SummaryImpression as SummaryComponentType;
      break;
    case 'Navigation':
      SummaryComponent = SummaryNavigation as SummaryComponentType;
      break;
    case 'LoadTime':
      SummaryComponent = SummaryLoadTime as SummaryComponentType;
      break;
  }

  if (!SummaryComponent) return null;

  return (
    <VStack hFill sx={{ p: 3, flexShrink: 0 }}>
      <VStack
        hFill
        sx={{
          backgroundColor: 'bg90.main',
          padding: '1em',
          borderRadius: '0.5em',
        }}
      >
        <SummaryComponent event={event} />
      </VStack>
    </VStack>
  );
}

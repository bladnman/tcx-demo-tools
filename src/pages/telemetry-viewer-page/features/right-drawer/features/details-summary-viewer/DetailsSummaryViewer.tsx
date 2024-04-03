import React from 'react';
import SummaryImpression from '@pages/telemetry-viewer-page/features/right-drawer/features/details-summary-viewer/features/SummaryImpression.tsx';
import { VStack } from '@common/mui-stacks.tsx';

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
  }

  if (!SummaryComponent) return null;

  return (
    <VStack sx={{ py: 3, flexShrink: 0 }}>
      <SummaryComponent event={event} />
    </VStack>
  );
}

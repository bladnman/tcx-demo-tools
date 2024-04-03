import { CardContent, Typography } from '@mui/material';
import SummaryRow from '@pages/telemetry-viewer-page/features/right-drawer/features/details-summary-viewer/common/SummaryRow.tsx';
import { VStack } from '@common/mui-stacks.tsx';

export default function SummaryImpression({ event }: { event: TVEvent }) {
  const labelSx = { minWidth: '7em' };

  const rowDefs = [
    { label: 'type', value: event.type },
    {
      label: 'visualEntityType',
      value: event?.clientEvent?.visualEntityType,
    },
    { label: 'ctaType', value: event?.clientEvent?.ctaType },
  ];

  return (
    <VStack sx={{ backgroundColor: 'bg90.main', borderRadius: '0.5em' }}>
      <CardContent>
        <Typography sx={{ fontSize: 15 }} color="fg50.main" gutterBottom>
          Event Summary
        </Typography>
        <VStack hFill topLeft>
          {rowDefs.map((rowDef) => (
            <SummaryRow
              key={rowDef.label}
              label={rowDef.label}
              value={rowDef.value}
              labelSx={labelSx}
            />
          ))}
        </VStack>
      </CardContent>
    </VStack>
  );
}

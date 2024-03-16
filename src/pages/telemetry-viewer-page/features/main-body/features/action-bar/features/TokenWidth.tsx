import { Slider, Typography } from '@mui/material';
import { VStack } from '@common/mui-stacks.tsx';
import useTelemetryStore from '@pages/telemetry-viewer-page/store/useTelemetryStore.ts';

export default function TokenWidth() {
  const { tokenWidth, setTokenWidth } = useTelemetryStore();
  const value = tokenWidth === 'min' ? 0 : 1;
  return (
    <VStack hAlign={'leading'} spacing={0}>
      <Slider
        marks
        max={1}
        min={0}
        defaultValue={value}
        size="small"
        onChange={(_, value) => {
          if (value === 0) {
            setTokenWidth('min');
          } else {
            setTokenWidth('max');
          }
        }}
        sx={{ width: '75px' }}
      />
      <Typography variant={'caption'} sx={{ whiteSpace: 'nowrap' }}>
        TWidth: {tokenWidth}
      </Typography>
    </VStack>
  );
}

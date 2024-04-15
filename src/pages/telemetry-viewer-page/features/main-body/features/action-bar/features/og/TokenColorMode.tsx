import { Slider, Typography } from '@mui/material';
import { VStack } from '@common/mui-stacks.tsx';
import useTelemetryStore from '@pages/telemetry-viewer-page/store/useTelemetryStore.ts';

export default function TokenColorMode() {
  const { tokenColorMode, setTokenColorMode } = useTelemetryStore();
  const value =
    tokenColorMode === 'none' ? 0 : tokenColorMode === 'single' ? 1 : 2;
  return (
    <VStack hAlign={'leading'} spacing={0}>
      <Slider
        marks
        max={2}
        min={0}
        defaultValue={value}
        size="small"
        onChange={(_, value) => {
          if (value === 0) {
            setTokenColorMode('none');
          } else if (value === 1) {
            setTokenColorMode('single');
          } else {
            setTokenColorMode('dual');
          }
        }}
        sx={{ width: '75px' }}
      />
      <Typography variant={'caption'} sx={{ whiteSpace: 'nowrap' }}>
        TColor: {tokenColorMode}
      </Typography>
    </VStack>
  );
}

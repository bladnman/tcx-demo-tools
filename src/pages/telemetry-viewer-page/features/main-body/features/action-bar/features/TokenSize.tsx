import { Slider, Typography } from '@mui/material';
import { VStack } from '@common/mui-stacks.tsx';
import useTelemetryStore from '@pages/telemetry-viewer-page/store/useTelemetryStore.ts';

export default function TokenSize() {
  const { tokenMode, setTokenMode } = useTelemetryStore();
  const value = tokenMode === 'icon' ? 0 : tokenMode === 'tag' ? 1 : 2;
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
            setTokenMode('icon');
          } else if (value === 1) {
            setTokenMode('tag');
          } else {
            setTokenMode('details');
          }
        }}
        sx={{ width: '75px' }}
      />
      <Typography variant={'caption'} sx={{ whiteSpace: 'nowrap' }}>
        TMode: {tokenMode}
      </Typography>
    </VStack>
  );
}

import { Slider, Typography } from '@mui/material';
import { VStack } from '@common/mui-stacks.tsx';
import useTelemetryStore from '@pages/telemetry-viewer-page/store/useTelemetryStore.ts';

export default function TokenFontSize() {
  const { tokenFontSize, setTokenFontSize } = useTelemetryStore();
  return (
    <VStack hAlign={'leading'} spacing={0}>
      <Slider
        max={5.0}
        min={0.25}
        step={0.1}
        defaultValue={tokenFontSize}
        size="small"
        onChange={(_, value) => {
          setTokenFontSize(value as number);
        }}
        sx={{ width: '75px' }}
      />
      <Typography variant={'caption'} sx={{ whiteSpace: 'nowrap' }}>
        TSize: {tokenFontSize}
      </Typography>
    </VStack>
  );
}

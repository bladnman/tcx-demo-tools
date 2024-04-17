import { Slider, Typography } from '@mui/material';
import { VStack } from '@common/mui-stacks.tsx';
import useSettingsStore from '@pages/telemetry-viewer-page/store/settings-store/useSettingsStore.ts';
import actionSetTokenFontSize from '@pages/telemetry-viewer-page/store/settings-store/actions/actionSetTokenFontSize.ts';

export default function TokenFontSize() {
  const { tokenFontSize } = useSettingsStore();
  return (
    <VStack hAlign={'leading'} spacing={0}>
      <Slider
        max={5.0}
        min={0.25}
        step={0.1}
        defaultValue={tokenFontSize}
        size="small"
        onChange={(_, value) => {
          actionSetTokenFontSize(value as number);
        }}
        sx={{ width: '75px' }}
      />
      <Typography variant={'caption'} sx={{ whiteSpace: 'nowrap' }}>
        TSize: {tokenFontSize}
      </Typography>
    </VStack>
  );
}

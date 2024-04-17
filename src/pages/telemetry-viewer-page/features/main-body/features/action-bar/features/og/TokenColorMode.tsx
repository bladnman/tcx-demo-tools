import { Slider, Typography } from '@mui/material';
import { VStack } from '@common/mui-stacks.tsx';
import useSettingsStore from '@pages/telemetry-viewer-page/store/settings-store/useSettingsStore.ts';
import actionSetTokenColorMode from '@pages/telemetry-viewer-page/store/settings-store/actions/actionSetTokenColorMode.ts';

export default function TokenColorMode() {
  const { tokenColorMode } = useSettingsStore();
  const value = tokenColorMode === 'none' ? 0 : tokenColorMode === 'single' ? 1 : 2;
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
            actionSetTokenColorMode('none');
          } else if (value === 1) {
            actionSetTokenColorMode('single');
          } else {
            actionSetTokenColorMode('dual');
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

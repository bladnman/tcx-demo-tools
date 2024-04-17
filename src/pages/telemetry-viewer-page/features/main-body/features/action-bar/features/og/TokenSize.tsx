import { Slider, Typography } from '@mui/material';
import { VStack } from '@common/mui-stacks.tsx';
import useSettingsStore from '@pages/telemetry-viewer-page/store/settings-store/useSettingsStore.ts';
import actionSetTokenMode from '@pages/telemetry-viewer-page/store/settings-store/actions/actionSetTokenMode.ts';

export default function TokenSize() {
  const { tokenMode } = useSettingsStore();
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
            actionSetTokenMode('icon');
          } else if (value === 1) {
            actionSetTokenMode('tag');
          } else {
            actionSetTokenMode('details');
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

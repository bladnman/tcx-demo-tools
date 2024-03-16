import useTelemetryStore from '@pages/telemetry-viewer-page/store/useTelemetryStore.ts';
import { VStack } from '@common/mui-stacks.tsx';
import { useTheme } from '@mui/material';
import JsonView from '@uiw/react-json-view';
import { lightTheme } from '@uiw/react-json-view/light';
import { CSSProperties } from 'react';
import { jsonViewTheme_VSCodeDark } from '@pages/telemetry-viewer-page/features/right-drawer/features/telemetry-details/json-view-themes.ts';

export default function TelemetryDetails() {
  const theme = useTheme();
  const mode = theme.palette.mode; // Accessing the mode (light/dark)
  const { eventForDetails } = useTelemetryStore();
  return (
    <VStack
      fill
      hAlign={'leading'}
      vAlign={'leading'}
      sx={{ px: 2, overflow: 'auto' }}
    >
      <JsonView
        value={eventForDetails as object}
        collapsed={2}
        displayDataTypes={false}
        enableClipboard={false}
        style={
          {
            ...(mode === 'dark' ? jsonViewTheme_VSCodeDark : lightTheme),
            backgroundColor: 'transparent',
          } as CSSProperties
        }
      />
    </VStack>
  );
}

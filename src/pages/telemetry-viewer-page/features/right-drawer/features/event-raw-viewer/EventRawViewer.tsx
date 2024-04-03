import { VStack } from '@common/mui-stacks.tsx';
import { useTheme } from '@mui/material';
import JsonView from '@uiw/react-json-view';
import { lightTheme } from '@uiw/react-json-view/light';
import { CSSProperties } from 'react';
import { jsonViewTheme_VSCodeDark } from '@pages/telemetry-viewer-page/features/right-drawer/features/event-raw-viewer/json-view-themes.ts';

export default function EventRawViewer({ event }: { event: TVEvent }) {
  const theme = useTheme();
  const mode = theme.palette.mode; // Accessing the mode (light/dark)
  return (
    <VStack
      fill
      hAlign={'leading'}
      vAlign={'leading'}
      sx={{ px: 2, overflow: 'auto' }}
    >
      <JsonView
        value={event as object}
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

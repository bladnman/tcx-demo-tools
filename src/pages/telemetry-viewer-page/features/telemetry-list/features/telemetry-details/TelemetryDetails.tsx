import useTelemetryStore from '@pages/telemetry-viewer-page/store/useTelemetryStore.ts';
import { VStack } from '@components/mui-stacks.tsx';
import { Button, useTheme } from '@mui/material';
import JsonView from '@uiw/react-json-view';
import { lightTheme } from '@uiw/react-json-view/light';
import { CSSProperties } from 'react';
import { jsonViewTheme_VSCodeDark } from '@pages/telemetry-viewer-page/features/telemetry-list/features/telemetry-details/json-view-themes.ts';

export default function TelemetryDetails() {
  const theme = useTheme();
  const mode = theme.palette.mode; // Accessing the mode (light/dark)

  const { eventForDetails, setEventForDetails } = useTelemetryStore();
  return (
    <VStack fill hAlign={'leading'} vAlign={'leading'}>
      <VStack
        fill
        hAlign={'leading'}
        vAlign={'leading'}
        sx={{
          height: '100%',
          width: '100%',
          border: '1px solid',
          borderColor: 'primary.main',
          borderRadius: 1,
          padding: 1,
          overflow: 'auto',
          backgroundColor: 'bg.dark',
        }}
      >
        <h4>Event Details</h4>
        <JsonView
          value={eventForDetails as object}
          collapsed={1}
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

      <Button
        variant="contained"
        color="primary"
        onClick={() => setEventForDetails(null)}
      >
        Close
      </Button>
    </VStack>
  );
}

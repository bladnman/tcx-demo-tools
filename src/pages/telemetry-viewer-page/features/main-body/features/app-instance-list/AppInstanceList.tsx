import useAppInstanceSequences from '@pages/telemetry-viewer-page/features/main-body/features/app-instance-list/hooks/useAppInstanceSequences.ts';
import { Grid } from '@mui/material';
import AppInstanceTile from '@pages/telemetry-viewer-page/features/main-body/features/app-instance-list/features/AppInstanceTile.tsx';
import useEventStore from '@pages/telemetry-viewer-page/store/event-store/useEventStore.ts';

export default function AppInstanceList() {
  const appInstanceSequences = useAppInstanceSequences();
  const eventForDetails = useEventStore((state) => state.eventForDetails);
  const scalar = eventForDetails ? 2 : 1;
  return (
    <Grid container spacing={2}>
      {appInstanceSequences.map((sequence) => (
        <Grid
          item
          xs={~~(12 * scalar)}
          sm={~~(6 * scalar)}
          md={~~(4 * scalar)}
          lg={~~(3 * scalar)}
          xl={~~(2 * scalar)}
          key={sequence.id}
        >
          <AppInstanceTile sequence={sequence} />
        </Grid>
      ))}
    </Grid>
  );
}

import { HStack, VStack } from '@common/mui-stacks.tsx';
import FIELD_DEF from '@const/FIELD_DEF.ts';
import { SummaryVisualizationProps } from '@features/inspector-panel/features/details-summary-viewer/types';
import useEventColor from '@hooks/useEventColor.ts';
import ForwardIcon from '@mui/icons-material/Forward';
import { Typography } from '@mui/material';

export default function SumNavFromTo({ event }: SummaryVisualizationProps) {
  const eventColor = useEventColor(event);

  return (
    <HStack hFill sx={{ pt: 2 }} top>
      <LocationView
        appName={event.appName}
        location={event.getStr(FIELD_DEF.referrerScene.paths)}
      />
      <ForwardIcon
        sx={{
          fontSize: '5em',
          // opacity: 0.2,
          color: `${eventColor}.main`,
        }}
      />
      <LocationView
        appName={event.appName}
        location={event.getStr(FIELD_DEF.locationScene.paths)}
        color={'secondary.main'}
      />
    </HStack>
  );
}
const LocationView = ({
  appName,
  location,
  color,
}: {
  appName: string | number | null | undefined;
  location: string | number | null | undefined;
  color?: string;
}) => {
  return (
    <VStack hFill spacing={0}>
      <HStack
        sx={{
          backgroundColor: 'fg50.main',
          px: '0.5em',
          borderRadius: '0.15em',
          height: '1.5em',
        }}
      >
        <Typography
          sx={{
            fontFamily: 'elza-narrow, Arial, sans-serif',
            color: 'bg.main',
            wordBreak: 'break-all',
          }}
        >
          {appName}
        </Typography>
      </HStack>
      <Typography
        variant={'detailSummaryRowValue'}
        sx={{ color, wordBreak: 'break-all' }}
      >
        {location}
      </Typography>
    </VStack>
  );
};

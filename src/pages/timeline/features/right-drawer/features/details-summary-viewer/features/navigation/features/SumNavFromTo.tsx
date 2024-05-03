import { HStack, VStack } from '@common/mui-stacks.tsx';
import FIELD_DEF from '@const/FIELD_DEF.ts';
import ForwardIcon from '@mui/icons-material/Forward';
import { Typography } from '@mui/material';
import { EVENT_TYPE_DEF } from '@const/EVENT_TYPE.ts';
import getObjectValueFromFieldDef from '@utils//object-value-utils/getObjectValueFromFieldDef.ts';

export default function SumNavFromTo({ event }: SummaryVisualizationProps) {
  const eventColor = EVENT_TYPE_DEF['Navigation'].color;

  console.log(`[🐽](SumNavFromTo) FIELD_DEF`, FIELD_DEF);
  return (
    <HStack hFill sx={{ pt: 2 }} top>
      <LocationView
        appName={getObjectValueFromFieldDef(event, FIELD_DEF.referrerApplicationName)}
        location={getObjectValueFromFieldDef(event, FIELD_DEF.referrerScene)}
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
        location={getObjectValueFromFieldDef(event, FIELD_DEF.locationScene)}
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

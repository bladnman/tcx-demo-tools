import { EVENT_TYPE_DEF } from '@const/EVENT_TYPE.ts';
import { EventTypes } from '@const/event-types.ts';
import { Typography } from '@mui/material';
import SummaryTable, {
  SummaryTableRowDef,
} from '@features/inspector-panel/features/details-summary-viewer/common/SummaryTable.tsx';
import FIELD_DEF from '@const/FIELD_DEF.ts';
import { HStack, VStack } from '@common/mui-stacks.tsx';
import getTvValue from '@utils/event-utils/getTvValue.ts';

export default function SummaryAvatar({ event }: { event: TVEvent }) {
  const eventColor = EVENT_TYPE_DEF[event.type as EventTypes]?.color ?? 'fg';

  const rowDefs: SummaryTableRowDef[] = [
    {
      ...FIELD_DEF.type,
      alwaysShow: true,
      color: `${eventColor}.main`,
    },
    FIELD_DEF.spanId,
  ];

  const overviewDefs: SummaryTableRowDef[] = [FIELD_DEF.appName];

  const imageSource = getTvValue(event, 'imageSource');
  const imageUrl = getTvValue(event, 'imageUri');
  return (
    <VStack hFill topLeft>
      <HStack hFill topLeft>
        <SummaryTable event={event} rowDefs={rowDefs} />
        <SummaryTable
          event={event}
          rowDefs={overviewDefs}
          stackOptions={{ topRight: true, topLeft: false }}
        />
      </HStack>
      <VStack hFill>
        {imageSource === 'AVATAR_FROM_NETWORK' && imageUrl && (
          <img src={imageUrl as string} alt="avatar" />
        )}
        {imageSource === 'AVATAR_FROM_PUP' && imageUrl && (
          <VStack
            spacing={0}
            sx={{
              backgroundColor: 'bg75.main',
              padding: '0.65em',
              borderRadius: '0.5em',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography>PUP</Typography>
            <Typography>IMAGE</Typography>
          </VStack>
        )}
        <Typography variant={'caption'}>{imageUrl}</Typography>
      </VStack>
    </VStack>
  );
}

import TWEvent from '@classes/data/TWEvent.ts';
import { HStack, VStack } from '@common/mui-stacks.tsx';
import FIELD_DEF from '@const/FIELD_DEF.ts';
import SummaryTable, {
  SummaryTableRowDef,
} from '@features/inspector-panel/features/details-summary-viewer/common/SummaryTable.tsx';
import useEventColor from '@hooks/useEventColor.ts';
import { Typography } from '@mui/material';

export default function SummaryAvatar({ event }: { event: TWEvent }) {
  const eventColor = useEventColor(event);

  const rowDefs: SummaryTableRowDef[] = [
    {
      ...FIELD_DEF.type,
      alwaysShow: true,
      color: `${eventColor}.main`,
    },
    FIELD_DEF.spanId,
  ];

  const overviewDefs: SummaryTableRowDef[] = [FIELD_DEF.appName];

  const imageSource = event.getStr('imageSource');
  const imageUrl = event.getStr('imageUri');
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

import TWEvent from '@classes/data/TWEvent.ts';
import { HStack, VStack } from '@common/mui-stacks.tsx';
import LabelRow from '@features/inspector-panel/features/details-summary-viewer/features/impression/features/parts/LabelRow.tsx';
import { Typography } from '@mui/material';

export default function ActionCard({ event }: { event: TWEvent }) {
  const actionCardPrimaryMessage = event.getStr('actionCardPrimaryMessage');
  const actionCardType = event.getStr('actionCardType');
  const actionCardPosition = event.getStr('actionCardPosition');

  if (!actionCardType) return null;

  return (
    <VStack
      sx={{ backgroundColor: 'bg80.main', borderRadius: '0.5em', overflow: 'hidden' }}
    >
      <HStack hFill sx={{ height: '8em', backgroundColor: 'bg75.main' }} />
      <VStack sx={{ px: 2, py: 1 }} spacing={0}>
        <Typography>{actionCardPrimaryMessage}</Typography>
        <LabelRow label="type" value={actionCardType as string} />
        <LabelRow label="pos" value={actionCardPosition as string} />
      </VStack>
    </VStack>
  );
}
/**
 * "actionCardId":"0cbfd1e2-8222-11ed-b2cc-2d12be..."
 * "actionCardPosition":0
 * "actionCardType":"uam"
 * "actionCardPrimaryMessage":"Competitive Tournament Activity 1"
 *
 *
 * "uamId":"0cbfd1e2-8222-11ed-b2cc-2d12be..."
 * "activityId":"tournament-1"
 * "udsNpCommId":"NPWR20231_00"
 * "inGameActivityId":
 * "matchId":
 * "uamTitleId":"PPSL03616_00"
 * "ualRecommendationId":"03eee67b-740f-49a5-b651-57668448b13e_0.0.1"
 * "uamActivityType":"competitive multi player"
 * "uamOwnerId":"7136986951381084527"
 * "uamStatus":"available"
 * "uamPeopleModuleType":"no module"
 * "uamState":"before"
 * "playtimeEstimate":17
 */

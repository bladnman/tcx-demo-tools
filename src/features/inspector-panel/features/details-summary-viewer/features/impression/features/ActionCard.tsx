import { HStack, VStack } from '@common/mui-stacks.tsx';
import { Typography } from '@mui/material';
import LabelRow from '@features/inspector-panel/features/details-summary-viewer/features/impression/features/parts/LabelRow.tsx';
import getTvValue from '@utils/event-utils/getTvValue.ts';

export default function ActionCard({ event }: { event: TVEvent }) {
  const actionCardPrimaryMessage = getTvValue(event, 'actionCardPrimaryMessage');
  const actionCardType = getTvValue(event, 'actionCardType');
  const actionCardPosition = getTvValue(event, 'actionCardPosition');

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

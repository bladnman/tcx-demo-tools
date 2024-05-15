import { HStack, VStack } from '@common/mui-stacks.tsx';
import { Typography } from '@mui/material';
import LabelRow from '@features/inspector-panel/features/details-summary-viewer/features/impression/features/parts/LabelRow.tsx';
import getTvValue from '@utils/event-utils/getTvValue.ts';

export default function Tile({ event }: { event: TVEvent }) {
  const actionCardPrimaryMessage = getTvValue(event, 'actionCardPrimaryMessage');
  const tileContent = getTvValue(event, 'tileContent');
  const tilePosition = getTvValue(event, 'tilePosition');
  const title = getTvValue(event, [
    'officialNewsStoryHeadline',
    'mediaContentTitle',
    'titleDetail[-1].titleName',
    'productDetail[-1].productName',
    'conceptDetail[-1].conceptName',
  ]);
  const priceOriginal = getTvValue(event, [
    'titleDetail[-1].titlePriceDetail[-1].originalPriceFormatted',
    'productDetail[-1].productPriceDetail[-1].originalPriceFormatted',
    'conceptDetail[-1].conceptPriceDetail[-1].originalPriceFormatted',
  ]);
  const priceDiscount = getTvValue(event, [
    'titleDetail[-1].titlePriceDetail[-1].discountPriceFormatted',
    'productDetail[-1].productPriceDetail[-1].discountPriceFormatted',
    'conceptDetail[-1].conceptPriceDetail[-1].discountPriceFormatted',
  ]);
  const subtitle = getTvValue(event, ['officialNewsStoryDescription']);

  if (tilePosition === undefined && !tileContent) return null;

  return (
    <VStack
      sx={{
        backgroundColor: 'bg75.main',
        borderRadius: '0em',
        overflow: 'hidden',
        minWidth: '7em',
      }}
    >
      <HStack hFill sx={{ height: '8em' }} />
      <VStack hFill sx={{ px: 2, py: 1, backgroundColor: 'bg80.main' }} spacing={0}>
        <Typography>{actionCardPrimaryMessage}</Typography>
        <VStack spacing={0}>
          <VStack left spacing={0}>
            {title && <Typography fontWeight={'bold'}>{title as string}</Typography>}
            {subtitle && <Typography>{subtitle as string}</Typography>}
          </VStack>
          <LabelRow label="type" value={tileContent as string} />
          <LabelRow label="pos" value={tilePosition as string} />
          <LabelRow label="price" value={priceOriginal as string} />
          <LabelRow label="discount" value={priceDiscount as string} />
        </VStack>
      </VStack>
    </VStack>
  );
}
/**
 * "strandName":"GamesAddOn"
 * "strandConfiguration":"single horizontal row"
 * "tilePosition":1
 * "tileContent":"game tile"
 * "tileFormat":"overlay"
 * "tileDetail":"game.bundle"
 * "selectedItem" : {
 *    "itemId":"10011871:UP8850-CUSL09126_00-R..."
 *    "itemType":"conceptProduct"
 *    "itemName":"Gemstones Bundle"
 *    "slotNumber":1
 * }
 * "contentSource":"searchResult"
 */

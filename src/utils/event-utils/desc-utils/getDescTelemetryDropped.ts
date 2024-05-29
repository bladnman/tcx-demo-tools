import TWEvent from '@classes/data/TWEvent.ts';
import FIELD_DEF from '@const/FIELD_DEF.ts';
import getEventDefColor from '@utils/event-utils/event-def/getEventDefColor.ts';
import { formatTWValueList } from '@utils/event-utils/formatTWValue.ts';

export default function getDescTelemetryDropped(event: TWEvent) {
  const highlight = undefined;
  const message = formatTWValueList(event, [
    {
      path: FIELD_DEF.droppedReason.paths,
    },
  ]);

  const color = getEventDefColor(event);

  return {
    highlight,
    message,
    color,
  };
}

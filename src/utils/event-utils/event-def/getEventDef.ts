import TWEvent from '@classes/data/TWEvent.ts';
import getEventDefAbbreviation from '@utils/event-utils/event-def/getEventDefAbbreviation.ts';
import getEventDefAppIcon from '@utils/event-utils/event-def/getEventDefAppIcon.ts';
import getEventDefColor from '@utils/event-utils/event-def/getEventDefColor.ts';
import getEventDefType from '@utils/event-utils/event-def/getEventDefType.ts';
import getEventDefTypeIcon from '@utils/event-utils/event-def/getEventDefTypeIcon.ts';

export function getEventDef(event: TWEvent): Partial<EventTypeDef> {
  return {
    type: getEventDefType(event),
    color: getEventDefColor(event),
    abbreviation: getEventDefAbbreviation(event),
    appIcon: getEventDefAppIcon(event),
    typeIcon: getEventDefTypeIcon(event),
  };
}

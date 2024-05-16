import TWEvent from '@classes/data/TWEvent.ts';
import FIELD_DEF from '@const/FIELD_DEF.ts';
import { formatTWValueList } from '@utils/event-utils/formatTWValue.ts';

export default function getDescError(event: TWEvent) {
  const highlight = event.getStr(FIELD_DEF.severity.paths);
  const severity = event.getStr(FIELD_DEF.severity.paths);
  const message = formatTWValueList(event, [
    {
      path: FIELD_DEF.vshErrorHexCode.paths,
    },
    {
      path: FIELD_DEF.errorMessage.paths,
    },
  ]);

  const color =
    severity === 'critical'
      ? `appRed.main`
      : severity === 'major'
        ? 'appRed.main'
        : `fg.main`;

  return {
    highlight,
    message,
    color,
  };
}

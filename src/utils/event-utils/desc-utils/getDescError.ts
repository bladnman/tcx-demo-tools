import FIELD_DEF from '@const/FIELD_DEF.ts';
import { formatTvValueList } from '@utils//event-utils/formatTvValue.ts';
import getTvValue from '@utils//event-utils/getTvValue.ts';

export default function getDescError(event: TVEvent) {
  const highlight = getTvValue(event, FIELD_DEF.severity.paths) as string;
  const severity = getTvValue(event, FIELD_DEF.severity.paths);
  const message = formatTvValueList(event, [
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

import getObjectValue from '@pages/telemetry-viewer-page/utils/getObjectValue.ts';
import FIELD_DEF from '@pages/telemetry-viewer-page/constants/FIELD_DEF.ts';

export default function getDescError(event: TVEvent) {
  const highlight = getObjectValue(event, FIELD_DEF.severity.paths) as string;
  const vshErrorHexCode = getObjectValue(
    event,
    FIELD_DEF.vshErrorHexCode.paths,
  );
  const errorMessage = getObjectValue(event, FIELD_DEF.errorMessage.paths);
  const severity = getObjectValue(event, FIELD_DEF.severity.paths);
  const message = `${vshErrorHexCode} | ${errorMessage}`;

  const color =
    severity === 'critical'
      ? `tokenDetailsFGRed.main`
      : severity === 'major'
        ? 'tokenDetailsFGRed.main'
        : `tokenDetailsFGBright.main`;

  return {
    highlight,
    message,
    color,
  };
}

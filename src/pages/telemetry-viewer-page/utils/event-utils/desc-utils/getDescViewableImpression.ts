import getObjectValue from '@pages/telemetry-viewer-page/utils/getObjectValue.ts';
import FIELD_DEF from '@pages/telemetry-viewer-page/constants/FIELD_DEF.ts';

export default function getDescViewableImpression(event: TVEvent) {
  const highlight = getObjectValue(event, FIELD_DEF.visualEntityType.paths);
  const message = getObjectValue(event, FIELD_DEF.interactCta.paths);

  return {
    highlight,
    message,
    color: `tokenDetailsFGBright.main`,
  };
}

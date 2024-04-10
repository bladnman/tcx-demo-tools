import { EVENT_TYPE_DEF } from '@pages/telemetry-viewer-page/constants/EVENT_TYPE.ts';
import { EventTypes } from '@pages/telemetry-viewer-page/types/event-types.ts';
import { includesAny } from '@pages/telemetry-viewer-page/utils/telemetry-utils.ts';

export function getEventDef(event: TVEvent): EventTypeDef {
  // some have an explicit definition
  const def = EVENT_TYPE_DEF[event.type as EventTypes];
  if (def) return def;

  const syntheticDef = { ...EVENT_TYPE_DEF.Other };

  const { type } = event;

  // COLORS
  if (includesAny(type, ['Error', 'Failure', 'Dropped', 'Crash'], false)) {
    syntheticDef.color = 'tokenMaroon';
  } else if (includesAny(type, ['BGS'], false)) {
    syntheticDef.color = 'tokenPurple';
  } else if (includesAny(type, ['Stat'], false)) {
    syntheticDef.color = 'tokenBrown';
  } else if (includesAny(type, ['NpWebApi'], false)) {
    syntheticDef.color = 'tokenEggplant';
  } else if (includesAny(type, ['background'], false)) {
    syntheticDef.color = 'tokenSlate';
  } else if (includesAny(type, ['drm'], false)) {
    syntheticDef.color = 'tokenBronze';
  } else if (includesAny(type, ['Ime'], true)) {
    syntheticDef.color = 'tokenGrayDim';
  } else if (includesAny(type, ['Power'], false)) {
    syntheticDef.color = 'tokenNeonGreen';
  }

  // ABBREVIATIONS
  if (includesAny(type, ['Error', 'Failure', 'Dropped'], false)) {
    syntheticDef.abbreviation = 'err';
  } else if (includesAny(type, ['BGS'], false)) {
    syntheticDef.abbreviation = 'bgs';
  } else if (includesAny(type, ['drm'], false)) {
    syntheticDef.abbreviation = 'drm';
  } else if (includesAny(type, ['NpWebApi'], false)) {
    syntheticDef.abbreviation = 'wApi';
  } else if (includesAny(type, ['background'], false)) {
    syntheticDef.abbreviation = 'bg';
  } else if (includesAny(type, ['Ime'], true)) {
    syntheticDef.abbreviation = 'ime';
  } else if (includesAny(type, ['Power'], false)) {
    syntheticDef.abbreviation = 'power';
  }

  // default to OTHER
  return syntheticDef;
}

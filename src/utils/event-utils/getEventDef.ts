import TWEvent from '@classes/data/TWEvent.ts';
import { EVENT_TYPE_DEF } from '@const/EVENT_TYPE.ts';
import { EventTypes } from '@const/event-types.ts';
import { includesAny } from '@utils//telemetry-utils.ts';

export function getEventDef(event: TWEvent): Partial<EventTypeDef> {
  // some have an explicit definition
  const def = EVENT_TYPE_DEF[event.twType as EventTypes];
  if (def) return def;

  const syntheticDef = { ...EVENT_TYPE_DEF.Other };

  const { twType } = event;

  // COLORS
  if (includesAny(twType, ['Error', 'Failure', 'Dropped', 'Crash'], false)) {
    syntheticDef.color = 'appMaroon';
  } else if (includesAny(twType, ['BGS'], false)) {
    syntheticDef.color = 'appPurple';
  } else if (includesAny(twType, ['Stat'], false)) {
    syntheticDef.color = 'appBrown';
  } else if (includesAny(twType, ['NpWebApi'], false)) {
    syntheticDef.color = 'appEggplant';
  } else if (includesAny(twType, ['background'], false)) {
    syntheticDef.color = 'appSlate';
  } else if (includesAny(twType, ['drm'], false)) {
    syntheticDef.color = 'appBronze';
  } else if (includesAny(twType, ['Ime'], true)) {
    syntheticDef.color = 'appBrown';
  } else if (includesAny(twType, ['Power'], false)) {
    syntheticDef.color = 'appNeonGreen';
  }

  // ABBREVIATIONS
  if (includesAny(twType, ['Error', 'Failure', 'Dropped'], false)) {
    syntheticDef.abbreviation = 'err';
  } else if (includesAny(twType, ['BGS'], false)) {
    syntheticDef.abbreviation = 'bgs';
  } else if (includesAny(twType, ['drm'], false)) {
    syntheticDef.abbreviation = 'drm';
  } else if (includesAny(twType, ['NpWebApi'], false)) {
    syntheticDef.abbreviation = 'wApi';
  } else if (includesAny(twType, ['background'], false)) {
    syntheticDef.abbreviation = 'bg';
  } else if (includesAny(twType, ['Ime'], true)) {
    syntheticDef.abbreviation = 'ime';
  } else if (includesAny(twType, ['Power'], false)) {
    syntheticDef.abbreviation = 'power';
  }

  // default to OTHER
  return syntheticDef;
}

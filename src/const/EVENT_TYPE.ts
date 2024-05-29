import { EventTypes } from './event-types.ts';

export const MajorClientEventTypes = [
  'ApplicationError',
  'Interaction',
  'Navigation',
  'NetworkError',
  'ViewableImpression',
];
export const HubAppNames = [
  'game-hub',
  'elysion',
  'psplus-service-hub',
  'rnps-library',
  'explore-hub',
  'monte-carlo',
  'rnps-compilation-disc-hub',
];

export const EVENT_TYPE_DEF: { [K in EventTypes]?: Partial<EventTypeDef> } = {
  ApplicationError: {
    type: 'ApplicationError',
    abbreviation: 'appErr',
    color: 'appRed',
    typeIcon: '🐞',
  },
  AvatarImageLoad: {
    type: 'AvatarImageLoad',
    abbreviation: 'avtr',
    color: 'appSlate',
    typeIcon: '👤',
  },
  Interaction: {
    type: 'Interaction',
    abbreviation: 'inter',
    color: 'appOrange',
    typeIcon: '🫰',
  },
  LoadTime: {
    type: 'LoadTime',
    abbreviation: 'time',
    color: 'appGreen',
    typeIcon: '⏱️',
  },
  Navigation: {
    type: 'Navigation',
    abbreviation: 'nav',
    color: 'appBlue',
    typeIcon: '➡️',
  },
  NetworkError: {
    type: 'NetworkError',
    abbreviation: 'netErr',
    color: 'appPink',
    typeIcon: '📵',
  },
  Startup: {
    type: 'Startup',
    abbreviation: 'start',
    color: 'appPurple',
    typeIcon: '🏎',
  },
  VideoStream: {
    type: 'VideoStream',
    abbreviation: 'video',
    color: 'appSlate',
    typeIcon: '📺',
  },
  ViewableImpression: {
    type: 'ViewableImpression',
    abbreviation: 'impr',
    color: 'appYellow',
    typeIcon: '👀',
  },
  ApplicationDbAppBrowse: {
    type: 'ApplicationDbAppBrowse',
    abbreviation: 'appDb',
    color: 'appBrown',
  },
  NotificationDb: {
    type: 'NotificationDb',
    abbreviation: 'notfDb',
    color: 'appBrown',
    typeIcon: '👜',
  },
  TraceSpan: {
    type: 'TraceSpan',
    abbreviation: 'trace',
    color: 'appBrown',
    typeIcon: '⚡︎',
  },
  AppSessionCrash: {
    type: 'AppSessionCrash',
    abbreviation: 'appCrsh',
    color: 'appRed',
    typeIcon: '🪖',
  },
  ErrorDialog: {
    type: 'ErrorDialog',
    abbreviation: 'errDlg',
    color: 'appRed',
    typeIcon: '🪖',
  },
  TelemetryDropped: {
    type: 'TelemetryDropped',
    abbreviation: 'tlmDrp',
    color: 'appPink',
    typeIcon: '🩸',
  },

  Other: {
    type: 'Other',
    abbreviation: 'other',
    color: 'appBrown',
    typeIcon: '⚪',
  },
};

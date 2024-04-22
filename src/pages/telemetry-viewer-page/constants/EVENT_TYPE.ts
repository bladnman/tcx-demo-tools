import { EventTypes } from '../types/event-types.ts';

export const EVENT_TYPE_DEF: { [K in EventTypes]: EventTypeDef } = {
  ApplicationError: {
    type: 'ApplicationError',
    abbreviation: 'appErr',
    color: 'appRed',
  },
  AvatarImageLoad: {
    type: 'AvatarImageLoad',
    abbreviation: 'avtr',
    color: 'appSlate',
  },
  Interaction: {
    type: 'Interaction',
    abbreviation: 'inter',
    color: 'appOrange',
  },
  LoadTime: {
    type: 'LoadTime',
    abbreviation: 'time',
    color: 'appGreen',
  },
  Navigation: {
    type: 'Navigation',
    abbreviation: 'nav',
    color: 'appBlue',
  },
  NetworkError: {
    type: 'NetworkError',
    abbreviation: 'netErr',
    color: 'appPink',
  },
  Startup: {
    type: 'Startup',
    abbreviation: 'start',
    color: 'appPurple',
  },
  VideoStream: {
    type: 'VideoStream',
    abbreviation: 'video',
    color: 'appSlate',
  },
  ViewableImpression: {
    type: 'ViewableImpression',
    abbreviation: 'impr',
    color: 'appYellow',
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
  },
  TraceSpan: {
    type: 'TraceSpan',
    abbreviation: 'trace',
    color: 'appBrown',
  },

  Other: {
    type: 'Other',
    abbreviation: 'other',
    color: 'appBrown',
  },
};

import { EventTypes } from '../types/event-types.ts';

export const EVENT_TYPE_DEF: { [K in EventTypes]: EventTypeDef } = {
  ApplicationError: {
    type: 'ApplicationError',
    abbreviation: 'appErr',
    color: 'tokenRed',
  },
  AvatarImageLoad: {
    type: 'AvatarImageLoad',
    abbreviation: 'avtr',
    color: 'tokenSlate',
  },
  Interaction: {
    type: 'Interaction',
    abbreviation: 'inter',
    color: 'tokenOrange',
  },
  LoadTime: {
    type: 'LoadTime',
    abbreviation: 'time',
    color: 'tokenGreen',
  },
  Navigation: {
    type: 'Navigation',
    abbreviation: 'nav',
    color: 'tokenBlue',
  },
  NetworkError: {
    type: 'NetworkError',
    abbreviation: 'netErr',
    color: 'tokenPink',
  },
  Startup: {
    type: 'Startup',
    abbreviation: 'start',
    color: 'tokenPurple',
  },
  VideoStream: {
    type: 'VideoStream',
    abbreviation: 'video',
    color: 'tokenSlate',
  },
  ViewableImpression: {
    type: 'ViewableImpression',
    abbreviation: 'impr',
    color: 'tokenYellow',
  },
  ApplicationDbAppBrowse: {
    type: 'ApplicationDbAppBrowse',
    abbreviation: 'appDb',
    color: 'tokenGray',
  },
  NotificationDb: {
    type: 'NotificationDb',
    abbreviation: 'notfDb',
    color: 'tokenSilver',
  },
  TraceSpan: {
    type: 'TraceSpan',
    abbreviation: 'trace',
    color: 'tokenGrayDim',
  },

  Other: {
    type: 'Other',
    abbreviation: 'other',
    color: 'tokenGrayVeryDark',
  },
};

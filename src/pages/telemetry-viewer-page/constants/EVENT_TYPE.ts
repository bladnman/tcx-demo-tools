import { EventTypes } from '../types/event-types.ts';

export const EVENT_TYPE_DEF: { [K in EventTypes]: EventTypeDef } = {
  ApplicationError: {
    type: 'ApplicationError',
    icon: '❎',
    abbreviation: 'appErr',
    color: 'tokenRed',
  },
  AvatarImageLoad: {
    type: 'AvatarImageLoad',
    icon: '👤',
    abbreviation: 'avtr',
    color: 'tokenSlate',
  },
  Interaction: {
    type: 'Interaction',
    icon: '👆🏼',
    abbreviation: 'inter',
    color: 'tokenOrange',
  },
  LoadTime: {
    type: 'LoadTime',
    icon: '⏱️',
    abbreviation: 'time',
    color: 'tokenGreen',
  },
  Navigation: {
    type: 'Navigation',
    icon: '🚏',
    abbreviation: 'nav',
    color: 'tokenBlue',
  },
  NetworkError: {
    type: 'NetworkError',
    icon: '📵',
    abbreviation: 'netErr',
    color: 'tokenPink',
  },
  Startup: {
    type: 'Startup',
    icon: '🚀',
    abbreviation: 'start',
    color: 'tokenPurple',
  },
  VideoStream: {
    type: 'VideoStream',
    icon: '🎥',
    abbreviation: 'video',
    color: 'tokenSlate',
  },
  ViewableImpression: {
    type: 'ViewableImpression',
    icon: '👀',
    abbreviation: 'impr',
    color: 'tokenYellow',
  },
  ApplicationDbAppBrowse: {
    type: 'ApplicationDbAppBrowse',
    icon: '㏈',
    abbreviation: 'appDb',
    color: 'tokenGray',
  },
  NotificationDb: {
    type: 'NotificationDb',
    icon: '㏈',
    abbreviation: 'notfDb',
    color: 'tokenSilver',
  },
  TraceSpan: {
    type: 'TraceSpan',
    icon: '',
    abbreviation: 'trace',
    color: 'tokenGrayDim',
  },

  Other: {
    type: 'Other',
    icon: '?',
    abbreviation: 'other',
    color: 'tokenGrayVeryDark',
  },
};

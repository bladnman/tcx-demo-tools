import { EventTypes } from '@pages/telemetry-viewer-page/types/event-types.ts';

export const EVENT_TYPE_DEF: { [K in EventTypes]: EventTypeDef } = {
  ApplicationError: {
    type: 'ApplicationError',
    icon: '❎',
    abbreviation: 'appErr',
    color: 'error',
  },
  AvatarImageLoad: {
    type: 'AvatarImageLoad',
    icon: '👤',
    abbreviation: 'avtr',
    color: 'bg',
  },
  Interaction: {
    type: 'Interaction',
    icon: '👆🏼',
    abbreviation: 'inter',
    color: 'warning',
  },
  LoadTime: {
    type: 'LoadTime',
    icon: '⏱️',
    abbreviation: 'time',
    color: 'success',
  },
  Navigation: {
    type: 'Navigation',
    icon: '🚏',
    abbreviation: 'nav',
    color: 'info',
  },
  NetworkError: {
    type: 'NetworkError',
    icon: '📵',
    abbreviation: 'netErr',
    color: 'error',
  },
  Startup: {
    type: 'Startup',
    icon: '🚀',
    abbreviation: 'start',
    color: 'success',
  },
  VideoStream: {
    type: 'VideoStream',
    icon: '🎥',
    abbreviation: 'video',
    color: 'bg',
  },
  ViewableImpression: {
    type: 'ViewableImpression',
    icon: '👀',
    abbreviation: 'impr',
    color: 'fg',
  },

  Other: {
    type: 'Other',
    icon: '?',
    abbreviation: 'n/a',
    color: 'warning',
  },
};

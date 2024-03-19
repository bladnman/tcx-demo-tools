export const EVENT_TYPES = [
  'ApplicationError',
  'AvatarImageLoad',
  'Interaction',
  'LoadTime',
  'Navigation',
  'NetworkError',
  'Startup',
  'VideoStream',
  'ViewableImpression',
  'Other',
] as const;
export type EventTypes = (typeof EVENT_TYPES)[number];

/**
 * VALUE_CONFIG allows for a mapping between
 * [fieldName].[fieldValue] -> [fieldValue]: [config]
 */
const VALUE_CONFIG = {
  type: {
    ApplicationError: {
      value: 'ApplicationError',
      icon: '❎',
      abbreviation: 'appErr',
      color: 'tokenRed',
    },
    AvatarImageLoad: {
      value: 'AvatarImageLoad',
      icon: '👤',
      abbreviation: 'avtr',
      color: 'tokenSlate',
    },
  },
  appName: {
    'game-hub': {
      value: 'game-hub',
      icon: '🎮',
      abbreviation: 'hub',
      color: 'tokenBlue',
    },
  },
};

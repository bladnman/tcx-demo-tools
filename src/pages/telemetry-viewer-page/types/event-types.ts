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

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

  Other: {
    type: 'Other',
    icon: '?',
    abbreviation: 'other',
    color: 'tokenSlate',
  },
};
export const EVENT_FILTER_TYPE: EventFilterDef[] = [
  {
    type: 'type',
    title: 'Event Type',
    defaultCollapsed: false,
  },
  {
    type: 'appName',
    title: 'App Name',
    defaultCollapsed: false,
  },
  {
    type: 'platformType',
    title: 'Platform Type',
    defaultCollapsed: true,
  },
  {
    type: 'namespace',
    title: 'Namespace',
    defaultCollapsed: true,
  },
  {
    type: 'vshErrorHexCode',
    title: 'VSH Error Hex Code',
    defaultCollapsed: true,
  },
  {
    type: 'severity',
    title: 'Severity',
    defaultCollapsed: true,
  },
  {
    type: 'errorMessage',
    title: 'Error Message',
    defaultCollapsed: true,
  },
  {
    type: 'locationScene',
    title: 'Location Scene',
    defaultCollapsed: true,
  },
  {
    type: 'hostAppName',
    title: 'Host App Name',
    defaultCollapsed: true,
  },
  {
    type: 'visualEntityType',
    title: 'Visual Entity Type',
    defaultCollapsed: true,
  },
  {
    type: 'interactAction',
    title: 'Interact Action',
    defaultCollapsed: true,
  },
  {
    type: 'interactCts',
    title: 'Interact CTA',
    defaultCollapsed: true,
  },
  {
    type: 'entryReferrerApplicationName',
    title: 'Entry Ref. App Name',
    defaultCollapsed: true,
  },
  {
    type: 'errorType',
    title: 'Error Type',
    defaultCollapsed: true,
  },
  {
    type: 'errorSubType',
    title: 'Error Sub Type',
    defaultCollapsed: true,
  },
  {
    type: 'consoleSessionId',
    title: 'Console Session ID',
    defaultCollapsed: true,
  },
  {
    type: 'openPsId',
    title: 'Open PS ID',
    defaultCollapsed: true,
  },
];

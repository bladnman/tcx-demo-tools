import { EVENT_TYPE_DEF } from '@pages/telemetry-viewer-page/constants/EVENT_TYPE.ts';
import { SYNTH_DATA } from '@pages/telemetry-viewer-page/constants/SYNTH_DATA.ts';

/**
 * Important to know that some of these flags are used in the
 * application code as well where we are synthesizing entries.
 * because of that we are creating a small key link hash here
 * for those special keys.
 */
export const TAG_KEY_LINKS = {
  CC: 'CC',
  IDLE: 'IDLE',
  PLAY: 'PLAY',
  WATCH: 'WATCH',
  HOME: 'HOME',
  CLOSE: 'CLOSE',
  POWER: 'POWER',
  SESSION: 'SESSION',
};
export const TAG_CONFIG: TagConfig[] = [
  {
    key: 'FRIENDS',
    icon: '🧪',
    uuid: '90',
    themeColor: 'appSlate',
    isActive: true,
    isDefault: true,
    rules: [
      [
        {
          path: 'type',
          mode: 'EQUALS',
          value: EVENT_TYPE_DEF.Interaction.type,
        },
        {
          path: 'interactAction',
          mode: 'CONTAINS',
          value: 'tap friend',
        },
      ],
    ],
  },
  {
    key: 'SELECTED PRODUCT',
    icon: '🛍️',
    uuid: '92',
    themeColor: 'appSlate',
    isActive: true,
    isDefault: true,
    rules: [
      [
        {
          path: 'type',
          mode: 'EQUALS',
          value: EVENT_TYPE_DEF.Interaction.type,
        },
        {
          path: 'interactAction',
          mode: 'CONTAINS',
          value: 'select product',
        },
        {
          path: 'type',
          mode: 'EQUALS',
          value: 'Interaction',
        },
      ],
    ],
  },
  {
    key: 'VIDEO ERROR',
    icon: '⚠️',
    uuid: '93',
    themeColor: 'appRed',
    isActive: true,
    isDefault: true,
    rules: [
      [
        {
          path: 'videoEventType',
          mode: 'EQUALS',
          value: 'error',
        },
        {
          path: 'type',
          mode: 'EQUALS',
          value: 'VideoStream',
        },
      ],
    ],
  },
  {
    key: 'VIDEO START',
    icon: '▶️',
    uuid: '93',
    themeColor: 'appGreen',
    isActive: true,
    isDefault: true,
    rules: [
      [
        {
          path: 'videoEventType',
          mode: 'EQUALS',
          value: 'start',
        },
        {
          path: 'type',
          mode: 'EQUALS',
          value: 'VideoStream',
        },
      ],
    ],
  },
  {
    key: TAG_KEY_LINKS.SESSION,
    icon: '🚦',
    uuid: '101',
    themeColor: 'appSlate',
    isActive: true,
    isDefault: true,
    rules: [
      [
        {
          path: 'syntheticType',
          mode: 'EQUALS',
          value: SYNTH_DATA.SESSION_BREAK_START,
        },
      ],
    ],
  },
  {
    key: TAG_KEY_LINKS.PLAY,
    icon: '🎮',
    uuid: '102',
    themeColor: 'appDeepBlue',
    isActive: true,
    isDefault: true,
    category: 'duration',
    rules: [
      [
        {
          path: 'type',
          mode: 'EQUALS',
          value: EVENT_TYPE_DEF.Interaction.type,
        },
        {
          path: 'interactAction',
          mode: 'EQUALS',
          value: 'return to game',
        },
      ],
      [
        {
          path: 'type',
          mode: 'EQUALS',
          value: EVENT_TYPE_DEF.Interaction.type,
        },
        {
          path: 'interactAction',
          mode: 'EQUALS',
          value: 'select play game',
        },
      ],
      [
        {
          path: 'type',
          mode: 'EQUALS',
          value: EVENT_TYPE_DEF.Interaction.type,
        },
        {
          path: 'interactAction',
          mode: 'EQUALS',
          value: 'launch app',
        },
        {
          path: 'tileContent',
          mode: 'EQUALS',
          value: 'game tile',
        },
      ],
      [
        {
          path: 'type',
          mode: 'EQUALS',
          value: EVENT_TYPE_DEF.Interaction.type,
        },
        {
          path: 'interactAction',
          mode: 'EQUALS',
          value: 'select join legacy session',
        },
      ],
      [
        {
          path: 'type',
          mode: 'EQUALS',
          value: EVENT_TYPE_DEF.Interaction.type,
        },
        {
          path: 'interactAction',
          mode: 'EQUALS',
          value: 'select join player session',
        },
      ],
      [
        {
          path: 'type',
          mode: 'EQUALS',
          value: EVENT_TYPE_DEF.Interaction.type,
        },
        {
          path: 'interactAction',
          mode: 'EQUALS',
          value: 'select resume',
        },
      ],
      [
        {
          path: 'type',
          mode: 'EQUALS',
          value: EVENT_TYPE_DEF.Interaction.type,
        },
        {
          path: 'interactAction',
          mode: 'EQUALS',
          value: 'select start activity',
        },
      ],
    ],
  },
  {
    key: TAG_KEY_LINKS.WATCH,
    icon: '📺',
    uuid: '103',
    themeColor: 'appRed',
    isActive: true,
    isDefault: true,
    category: 'duration',
    rules: [
      [
        {
          path: 'type',
          mode: 'EQUALS',
          value: EVENT_TYPE_DEF.Interaction.type,
        },
        {
          path: 'interactAction',
          mode: 'EQUALS',
          value: 'launch app',
        },
        {
          path: 'tileContent',
          mode: 'EQUALS',
          value: 'app tile',
        },
      ],
      [
        {
          path: 'type',
          mode: 'EQUALS',
          value: EVENT_TYPE_DEF.Interaction.type,
        },
        {
          path: 'interactAction',
          mode: 'EQUALS',
          value: 'watch screen share',
        },
      ],
      [
        {
          path: 'type',
          mode: 'EQUALS',
          value: EVENT_TYPE_DEF.Interaction.type,
        },
        {
          path: 'interactAction',
          mode: 'EQUALS',
          value: 'view fullscreen screen share',
        },
      ],
      [
        {
          path: 'appName',
          mode: 'EQUALS',
          value: 'monte-carlo',
        },
        {
          path: 'type',
          mode: 'EQUALS',
          value: EVENT_TYPE_DEF.Interaction.type,
        },
        {
          path: 'productDetail',
          mode: 'CONTAINS',
          value: 'productType=MOVIE',
        },
      ],
    ],
  },
  {
    key: TAG_KEY_LINKS.IDLE,
    icon: '⏰',
    uuid: '104',
    themeColor: 'appSlate',
    isActive: true,
    isDefault: true,
    category: 'duration',
    rules: [
      [
        {
          path: 'syntheticType',
          mode: 'EQUALS',
          value: SYNTH_DATA.TIME_BREAK,
        },
      ],
    ],
  },
  {
    key: TAG_KEY_LINKS.POWER,
    icon: '🔌',
    uuid: '105',
    rules: [
      [
        {
          path: 'type',
          mode: 'EQUALS',
          value: EVENT_TYPE_DEF.Interaction.type,
        },
        {
          path: 'interactAction',
          mode: 'EQUALS',
          value: 'select power options item',
        },
      ],
    ],
    themeColor: 'appViolet',
    isActive: true,
    isDefault: true,
  },
  {
    key: TAG_KEY_LINKS.CLOSE,
    icon: '❌',
    uuid: '106',
    themeColor: 'appMaroon',
    isActive: true,
    isDefault: true,
    rules: [
      [
        {
          path: 'type',
          mode: 'EQUALS',
          value: EVENT_TYPE_DEF.Interaction.type,
        },
        {
          path: 'interactAction',
          mode: 'EQUALS',
          value: 'close game',
        },
      ],
    ],
  },
  {
    key: TAG_KEY_LINKS.CC,
    icon: '🎛️',
    uuid: '107',
    themeColor: 'appSlate',
    isActive: true,
    isDefault: true,
    category: 'system',
    rules: [
      [
        {
          path: 'syntheticType',
          mode: 'EQUALS',
          value: SYNTH_DATA.CC_START,
        },
      ],
    ],
  },
  {
    key: 'STORE',
    icon: '🛒',
    uuid: '108',
    themeColor: 'appPurple',
    isActive: true,
    isDefault: true,
    rules: [
      [
        {
          path: 'type',
          mode: 'EQUALS',
          value: EVENT_TYPE_DEF.Interaction.type,
        },
        {
          path: 'interactAction',
          mode: 'EQUALS',
          value: 'open hub',
        },
        {
          path: 'titleDetail',
          mode: 'EQUALS',
          value: 'PlayStation Store',
        },
      ],
    ],
  },
  {
    key: 'LIBRARY',
    icon: '📚',
    uuid: '109',
    themeColor: 'appPurple',
    isActive: true,
    isDefault: true,
    rules: [
      [
        {
          path: 'type',
          mode: 'EQUALS',
          value: EVENT_TYPE_DEF.Interaction.type,
        },
        {
          path: 'interactAction',
          mode: 'EQUALS',
          value: 'open hub',
        },
        {
          path: 'titleDetail',
          mode: 'EQUALS',
          value: 'Game Library',
        },
      ],
    ],
  },
  {
    key: 'SEARCH SELECT',
    icon: '🔎',
    uuid: '110',
    themeColor: 'appBronze',
    isActive: true,
    isDefault: true,
    rules: [
      [
        {
          path: 'type',
          mode: 'EQUALS',
          value: EVENT_TYPE_DEF.Interaction.type,
        },
        {
          path: 'interactAction',
          mode: 'EQUALS',
          value: 'select domain tile',
        },
        {
          path: 'locationScene',
          mode: 'EQUALS',
          value: 'games search tab',
        },
      ],
    ],
  },
  {
    key: 'SEARCH',
    icon: '🔎',
    uuid: '111',
    themeColor: 'appBronze',
    isActive: true,
    isDefault: true,
    rules: [
      [
        {
          path: 'type',
          mode: 'EQUALS',
          value: EVENT_TYPE_DEF.Interaction.type,
        },
        {
          path: 'interactAction',
          mode: 'EQUALS',
          value: 'click search',
        },
      ],
      [
        {
          path: 'type',
          mode: 'EQUALS',
          value: 'interaction',
        },
        {
          path: 'locationScene',
          mode: 'EQUALS',
          value: 'games search tab',
        },
      ],
    ],
  },
  {
    key: 'GH PRE',
    icon: '👾',
    uuid: '112',
    themeColor: 'appBlue',
    isActive: true,
    isDefault: true,
    rules: [
      [
        {
          path: 'type',
          mode: 'EQUALS',
          value: EVENT_TYPE_DEF.Interaction.type,
        },
        {
          path: 'interactAction',
          mode: 'EQUALS',
          value: 'select product tile go to game hub',
        },
      ],
      [
        {
          path: 'type',
          mode: 'EQUALS',
          value: EVENT_TYPE_DEF.Interaction.type,
        },
        {
          path: 'interactAction',
          mode: 'EQUALS',
          value: 'Go to Game Hub pre-purchase',
        },
      ],
      [
        {
          path: 'type',
          mode: 'EQUALS',
          value: EVENT_TYPE_DEF.Interaction.type,
        },
        {
          path: 'interactAction',
          mode: 'EQUALS',
          value: 'select view game',
        },
      ],
    ],
  },
  {
    key: 'GH ENTER',
    icon: '👾',
    uuid: '113',
    themeColor: 'appBlue',
    isActive: true,
    isDefault: true,
    rules: [
      [
        {
          path: 'type',
          mode: 'EQUALS',
          value: EVENT_TYPE_DEF.Interaction.type,
        },
        {
          path: 'interactAction',
          mode: 'EQUALS',
          value: 'navigate to game hub',
        },
      ],
      [
        {
          path: 'type',
          mode: 'EQUALS',
          value: EVENT_TYPE_DEF.Interaction.type,
        },
        {
          path: 'interactCta',
          mode: 'EQUALS',
          value: 'go to game hub',
        },
      ],
      [
        // from search results
        {
          path: 'type',
          mode: 'EQUALS',
          value: EVENT_TYPE_DEF.Interaction.type,
        },
        {
          path: 'interactAction',
          mode: 'EQUALS',
          value: 'select domain tile',
        },
        {
          path: 'interactCta',
          mode: 'EQUALS',
          value: 'search domain item',
        },
        {
          path: 'tileContent',
          mode: 'EQUALS',
          value: 'game tile',
        },
      ],
    ],
  },
  {
    key: 'ADD TO CART',
    icon: '🛒',
    uuid: '114',
    themeColor: 'appSlate',
    isActive: true,
    isDefault: true,
    rules: [
      [
        {
          path: 'type',
          mode: 'EQUALS',
          value: EVENT_TYPE_DEF.Interaction.type,
        },
        {
          path: 'interactAction',
          mode: 'EQUALS',
          value: 'select add to cart',
        },
      ],
    ],
  },
  {
    key: 'PURCHASE',
    icon: '💳',
    uuid: '115',
    themeColor: 'appPink',
    isActive: true,
    isDefault: true,
    rules: [
      [
        {
          path: 'type',
          mode: 'EQUALS',
          value: EVENT_TYPE_DEF.Interaction.type,
        },
        {
          path: 'interactAction',
          mode: 'EQUALS',
          value: 'select confirm purchase',
        },
      ],
    ],
  },
  {
    key: 'DOWNLOAD',
    icon: '⤵️',
    uuid: '116',
    themeColor: 'appPurple',
    isActive: true,
    isDefault: true,
    rules: [
      [
        {
          path: 'type',
          mode: 'EQUALS',
          value: EVENT_TYPE_DEF.Interaction.type,
        },
        {
          path: 'interactAction',
          mode: 'EQUALS',
          value: 'select download all',
        },
      ],
      [
        {
          path: 'type',
          mode: 'EQUALS',
          value: EVENT_TYPE_DEF.Interaction.type,
        },
        {
          path: 'interactAction',
          mode: 'EQUALS',
          value: 'select download',
        },
      ],
    ],
  },
  {
    key: 'PS PLUS',
    icon: '➕',
    uuid: '117',
    themeColor: 'appSlate',
    isActive: true,
    isDefault: true,
    rules: [
      [
        {
          path: 'type',
          mode: 'EQUALS',
          value: EVENT_TYPE_DEF.Interaction.type,
        },
        {
          path: 'interactAction',
          mode: 'EQUALS',
          value: 'open hub',
        },
        {
          path: 'titleDetail',
          mode: 'EQUALS',
          value: 'PlayStation Plus',
        },
      ],
    ],
  },
  {
    key: 'SWITCH USER',
    icon: '👤',
    uuid: '118',
    themeColor: 'appSlate',
    isActive: true,
    isDefault: true,
    rules: [
      [
        {
          path: 'type',
          mode: 'EQUALS',
          value: EVENT_TYPE_DEF.Interaction.type,
        },
        {
          path: 'interactAction',
          mode: 'EQUALS',
          value: 'initiate switch user',
        },
      ],
    ],
  },
  {
    key: 'LOGOUT',
    icon: '🚪',
    uuid: '119',
    themeColor: 'appSlate',
    isActive: true,
    isDefault: true,
    rules: [
      [
        {
          path: 'type',
          mode: 'EQUALS',
          value: EVENT_TYPE_DEF.Interaction.type,
        },
        {
          path: 'interactAction',
          mode: 'EQUALS',
          value: 'log out from psn',
        },
      ],
    ],
  },
  {
    key: 'UPDATE',
    icon: '💿',
    uuid: '120',
    themeColor: 'appSlate',
    isActive: true,
    isDefault: true,
    rules: [
      [
        {
          path: 'appName',
          mode: 'EQUALS',
          value: 'system-modal-dialog',
        },
        {
          path: 'locationScene',
          mode: 'EQUALS',
          value: 'ps5:onboarding:system update:downloading',
        },
      ],
    ],
  },
  {
    key: 'SIGN-IN',
    icon: '🔑',
    uuid: '121',
    themeColor: 'appSlate',
    isActive: true,
    isDefault: true,
    rules: [
      [
        {
          path: 'type',
          mode: 'EQUALS',
          value: 'startup',
        },
        {
          path: 'appName',
          mode: 'EQUALS',
          value: 'auto-sign-in',
        },
      ],
      [
        {
          path: 'type',
          mode: 'EQUALS',
          value: EVENT_TYPE_DEF.Interaction.type,
        },
        {
          path: 'interactAction',
          mode: 'EQUALS',
          value: 'signin',
        },
      ],
    ],
  },
  {
    key: 'USER',
    icon: '🙂',
    uuid: '122',
    themeColor: 'appSlate',
    isActive: true,
    isDefault: true,
    rules: [
      [
        {
          path: 'locationScene',
          mode: 'EQUALS',
          value: 'login:user selection screen',
        },
        {
          path: 'referrerApplicationName',
          mode: 'EQUALS',
          value: 'login:user selection screen',
        },
      ],
    ],
  },
  {
    key: 'HOME',
    icon: '🏠',
    uuid: '123',
    themeColor: 'appSlate',
    isActive: true,
    isDefault: true,
    category: 'system',
    rules: [
      [
        {
          path: 'type',
          mode: 'EQUALS',
          value: 'navigation',
        },
        {
          path: 'locationScene',
          mode: 'EQUALS',
          value: 'game',
        },
      ],
    ],
  },
  {
    key: 'PROFILE',
    icon: '👤',
    uuid: '124',
    themeColor: 'appSlate',
    isActive: true,
    isDefault: true,
    rules: [
      [
        {
          path: 'type',
          mode: 'EQUALS',
          value: EVENT_TYPE_DEF.Interaction.type,
        },
        {
          path: 'interactAction',
          mode: 'EQUALS',
          value: 'click profile',
        },
      ],
    ],
  },
  {
    key: 'SETTINGS',
    icon: '⚙️',
    uuid: '125',
    themeColor: 'appSlate',
    isActive: true,
    isDefault: true,
    rules: [
      [
        {
          path: 'type',
          mode: 'EQUALS',
          value: EVENT_TYPE_DEF.Interaction.type,
        },
        {
          path: 'interactAction',
          mode: 'EQUALS',
          value: 'click settings',
        },
      ],
    ],
  },
  {
    key: 'PARTY',
    icon: '💬',
    uuid: '126',
    themeColor: 'appCyan',
    isActive: true,
    isDefault: true,
    rules: [
      [
        {
          path: 'type',
          mode: 'EQUALS',
          value: EVENT_TYPE_DEF.Interaction.type,
        },
        {
          path: 'interactAction',
          mode: 'EQUALS',
          value: 'select private party chat',
        },
      ],
    ],
  },
  {
    key: 'TEXT',
    icon: '💬',
    uuid: '127',
    themeColor: 'appCyan',
    isActive: true,
    isDefault: true,
    rules: [
      [
        {
          path: 'type',
          mode: 'EQUALS',
          value: EVENT_TYPE_DEF.Interaction.type,
        },
        {
          path: 'interactAction',
          mode: 'EQUALS',
          value: 'submit text message',
        },
      ],
    ],
  },
  {
    key: 'VOICE',
    icon: '📞',
    uuid: '128',
    themeColor: 'appSlate',
    isActive: true,
    isDefault: true,
    rules: [
      [
        {
          path: 'type',
          mode: 'EQUALS',
          value: EVENT_TYPE_DEF.Interaction.type,
        },
        {
          path: 'interactAction',
          mode: 'EQUALS',
          value: 'join private voice chat',
        },
      ],
    ],
  },
  {
    key: 'SOFT WARN',
    icon: '⚠️',
    uuid: '129',
    themeColor: 'appOrange',
    isActive: true,
    isDefault: true,
    rules: [
      [
        {
          path: 'errorType',
          mode: 'EQUALS',
          value: 'RNPS-FWK: heap size exceeded 75%',
        },
      ],
    ],
  },
  {
    key: 'SOFT LIMIT',
    icon: '☢️',
    uuid: '130',
    themeColor: 'appRed',
    isActive: true,
    isDefault: true,
    rules: [
      [
        {
          path: 'errorType',
          mode: 'EQUALS',
          value: 'RNPS-FWK: terminated by softlimit',
        },
      ],
    ],
  },
];

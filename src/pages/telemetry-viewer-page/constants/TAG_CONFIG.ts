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
// TODO: these are here temporarily while conversion happens
const COLORS = {
  warn: '#ff357f',
  watch: '#f46051',
  play: '#5499f4',
  idle: '#c3beb9',
  big_entry: '#e8e3f0',
  pri_low: '#b2b2b2',
  pri_med: '#cadbd9',
  pri_high: '#ffad5b',
  base: '#606060',
  text_reversed: '#ECEBE5',
  text: '#313131',
};
export const TAG_CONFIG: TagConfig[] = [
  {
    key: 'FRIENDS',
    icon: '🧪',
    uuid: '90',
    bgColor: COLORS.big_entry,
    textColor: COLORS.text,
    isActive: true,
    isDefault: true,
    rules: [
      [
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
    bgColor: COLORS.big_entry,
    textColor: COLORS.text,
    isActive: true,
    isDefault: true,
    rules: [
      [
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
    key: 'WATCH',
    icon: '▶️',
    uuid: '93',
    bgColor: COLORS.warn,
    textColor: COLORS.text_reversed,
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
    bgColor: COLORS.base,
    textColor: COLORS.text_reversed,
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
    bgColor: COLORS.play,
    textColor: COLORS.text_reversed,
    isActive: true,
    isDefault: true,
    category: 'duration',
    rules: [
      [
        {
          path: 'interactAction',
          mode: 'EQUALS',
          value: 'return to game',
        },
      ],
      [
        {
          path: 'interactAction',
          mode: 'EQUALS',
          value: 'select play game',
        },
      ],
      [
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
          path: 'interactAction',
          mode: 'EQUALS',
          value: 'select join legacy session',
        },
      ],
      [
        {
          path: 'interactAction',
          mode: 'EQUALS',
          value: 'select join player session',
        },
      ],
      [
        {
          path: 'interactAction',
          mode: 'EQUALS',
          value: 'select resume',
        },
      ],
      [
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
    bgColor: COLORS.watch,
    textColor: COLORS.text_reversed,
    isActive: true,
    isDefault: true,
    category: 'duration',
    rules: [
      [
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
          path: 'interactAction',
          mode: 'EQUALS',
          value: 'watch screen share',
        },
      ],
      [
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
          path: 'eventType',
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
    bgColor: COLORS.idle,
    textColor: COLORS.text_reversed,
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
          path: 'interactAction',
          mode: 'EQUALS',
          value: 'select power options item',
        },
      ],
    ],
    bgColor: COLORS.base,
    textColor: COLORS.text_reversed,
    isActive: true,
    isDefault: true,
  },
  {
    key: TAG_KEY_LINKS.CLOSE,
    icon: '❌',
    uuid: '106',
    bgColor: COLORS.pri_high,
    textColor: COLORS.text,
    isActive: true,
    isDefault: true,
    rules: [
      [
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
    bgColor: 'transparent',
    textColor: COLORS.text,
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
    bgColor: COLORS.pri_med,
    textColor: COLORS.text,
    isActive: true,
    isDefault: true,
    rules: [
      [
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
    bgColor: 'transparent',
    textColor: COLORS.text,
    isActive: true,
    isDefault: true,
    rules: [
      [
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
    bgColor: 'transparent',
    textColor: COLORS.text,
    themeColor: 'tokenPurple',
    isActive: true,
    isDefault: true,
    rules: [
      [
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
    bgColor: 'transparent',
    textColor: COLORS.text,
    isActive: true,
    isDefault: true,
    rules: [
      [
        {
          path: 'interactAction',
          mode: 'EQUALS',
          value: 'click search',
        },
      ],
      [
        {
          path: 'eventType',
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
    bgColor: 'transparent',
    textColor: COLORS.text,
    isActive: true,
    isDefault: true,
    rules: [
      [
        {
          path: 'interactAction',
          mode: 'EQUALS',
          value: 'select product tile go to game hub',
        },
      ],
      [
        {
          path: 'interactAction',
          mode: 'EQUALS',
          value: 'Go to Game Hub pre-purchase',
        },
      ],
      [
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
    bgColor: 'transparent',
    textColor: COLORS.text,
    isActive: true,
    isDefault: true,
    rules: [
      [
        {
          path: 'interactAction',
          mode: 'EQUALS',
          value: 'navigate to game hub',
        },
      ],
      [
        {
          path: 'interactCta',
          mode: 'EQUALS',
          value: 'go to game hub',
        },
      ],
      [
        // from search results
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
    bgColor: 'transparent',
    textColor: COLORS.text,
    isActive: true,
    isDefault: true,
    rules: [
      [
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
    bgColor: 'transparent',
    textColor: COLORS.text,
    isActive: true,
    isDefault: true,
    rules: [
      [
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
    bgColor: COLORS.pri_low,
    textColor: COLORS.text_reversed,
    isActive: true,
    isDefault: true,
    rules: [
      [
        {
          path: 'interactAction',
          mode: 'EQUALS',
          value: 'select download all',
        },
      ],
      [
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
    bgColor: 'transparent',
    textColor: COLORS.text,
    isActive: true,
    isDefault: true,
    rules: [
      [
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
    bgColor: 'transparent',
    textColor: COLORS.text,
    isActive: true,
    isDefault: true,
    rules: [
      [
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
    bgColor: 'transparent',
    textColor: COLORS.text,
    isActive: true,
    isDefault: true,
    rules: [
      [
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
    bgColor: 'transparent',
    textColor: COLORS.text,
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
    bgColor: 'transparent',
    textColor: COLORS.text,
    isActive: true,
    isDefault: true,
    rules: [
      [
        {
          path: 'eventType',
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
    bgColor: 'transparent',
    textColor: COLORS.text,
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
    bgColor: 'transparent',
    textColor: COLORS.text,
    isActive: true,
    isDefault: true,
    category: 'system',
    rules: [
      [
        {
          path: 'eventType',
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
    bgColor: 'transparent',
    textColor: COLORS.text,
    isActive: true,
    isDefault: true,
    rules: [
      [
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
    bgColor: 'transparent',
    textColor: COLORS.text,
    isActive: true,
    isDefault: true,
    rules: [
      [
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
    bgColor: COLORS.pri_med,
    textColor: COLORS.text,
    isActive: true,
    isDefault: true,
    rules: [
      [
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
    bgColor: COLORS.pri_med,
    textColor: COLORS.text_reversed,
    isActive: true,
    isDefault: true,
    rules: [
      [
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
    bgColor: 'transparent',
    textColor: COLORS.text,
    isActive: true,
    isDefault: true,
    rules: [
      [
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
    bgColor: 'transparent',
    textColor: COLORS.text,
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
    bgColor: COLORS.warn,
    textColor: COLORS.text,
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

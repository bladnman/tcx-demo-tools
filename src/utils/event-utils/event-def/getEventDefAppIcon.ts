import TWEvent from '@classes/data/TWEvent.ts';
import { APPS } from '@const/APPS.ts';

export default function getEventDefAppIcon(eventOrAppName: TWEvent | string): string {
  const defaultIcon = '🔹';

  const appName =
    typeof eventOrAppName === 'string'
      ? eventOrAppName
      : (eventOrAppName as TWEvent).getStr('appName');
  const isKnownNative =
    typeof eventOrAppName === 'string'
      ? false
      : (eventOrAppName as TWEvent).getStr('namespace')?.includes('native');

  if (!appName) {
    if (isKnownNative) return '🏭';
    return defaultIcon;
  }

  // any explicit definitions
  const def = APPS[appName];
  if (def?.icon) return def.icon;

  // General
  if (appName.includes('BGS-Prefetch')) {
    return '📦';
  } else if (appName.includes('BGS-UT')) {
    return '📡';
  } else if (appName.includes('BGS-')) {
    return '🧱';
  } else if (appName === 'rnps-game-hub') {
    return '🚨';
  }

  return defaultIcon;
}

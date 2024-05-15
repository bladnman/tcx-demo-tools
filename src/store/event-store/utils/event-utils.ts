import getTvValue from '@utils/event-utils/getTvValue.ts';

export function getAppInstanceId(event: TVEvent): string | null {
  return (getTvValue(event, 'appInstanceId') as string | undefined) ?? null;
}

export function getAppName(event: TVEvent): string | null {
  return (getTvValue(event, 'appName') as string | undefined) ?? null;
}

export function getLocationScene(event: TVEvent): string | null {
  return (getTvValue(event, 'locationScene') as string | undefined) ?? null;
}

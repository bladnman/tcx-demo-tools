import dayjs from 'dayjs';

export default function formatMsToHms(ms: number, format: string = 'h:mm:ss'): string {
  return dayjs(ms).format(format);
}

import dayjs from 'dayjs';

export default function formatDateString(
  dateString: string,
  format: string,
): string {
  return dayjs(dateString).format(format);
}

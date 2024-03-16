import colorToRgba from '@pages/telemetry-viewer-page/utils/colorToRgba.ts';

export default function opacity(opacity: number, color: string) {
  const { values } = colorToRgba(color);

  // could not get values from colorToRgba
  if (values.length < 3) return color;

  values[3] = opacity;

  return `rgba(${values.join(',')})`;
}

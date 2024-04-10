import { useMemo } from 'react';
import { EVENT_TYPE_DEF } from '@pages/telemetry-viewer-page/constants/EVENT_TYPE.ts';
import { EventTypes } from '@pages/telemetry-viewer-page/types/event-types.ts';

/**
 * Returns the color of the event type
 *
 * NOTE: This will return the "overall" color, not
 * a specific shade of the color. This will be a string,
 * but cannot be used directly as a color unless given
 * to a MUI component.
 *
 * Example:
 *
 * This may give you 'appRed' back. But to use that in
 * something like an sx prop, you would need to do
 * `${'appRed'}.main` to get the actual color.
 *
 * In a button you can do:
 * <Button color='appRed'>
 *
 * This is because MUI uses the color prop and will apply
 * the main, light, and dark shades as needed.
 */
export default function useEventColor(event: TVEvent) {
  return useMemo(() => {
    return EVENT_TYPE_DEF[event.type as EventTypes].color;
  }, [event.type]);
}

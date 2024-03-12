import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type {} from '@redux-devtools/extension';
import getEventsFromReceivedData from '@pages/telemetry-viewer-page/utils/getEventsFromReceivedData.ts'; // required for devtools typing

interface TelemetryStore {
  events: TelemetryEventMessage[];
  addEvent: (event: TelemetryEventMessage) => void;
  allowWrap: boolean;
  setAllowWrap: (allowWrap: boolean) => void;
  eventTypeFilter: string[];
  setEventTypeFilter: (eventCodeFilter: string[]) => void;
  eventForDetails: TelemetryEventMessage | null;
  setEventForDetails: (event: TelemetryEventMessage | null) => void;
  appBarHeight: number;
  setAppBarHeight: (height: number) => void;
}

const useTelemetryStore = create<TelemetryStore>()(
  devtools((set) => ({
    events: [],
    addEvent: (event: TelemetryEventMessage) =>
      set((state) => ({
        events: [...getEventsFromReceivedData(event), ...state.events],
      })),
    allowWrap: false,
    setAllowWrap: (allowWrap: boolean) => set({ allowWrap }),
    eventTypeFilter: [],
    setEventTypeFilter: (eventTypeFilter: string[]) => set({ eventTypeFilter }),
    eventForDetails: null,
    setEventForDetails: (event: TelemetryEventMessage | null) =>
      set({ eventForDetails: event }),
    appBarHeight: 0,
    setAppBarHeight: (height: number) => set({ appBarHeight: height }),
  })),
);
export default useTelemetryStore;

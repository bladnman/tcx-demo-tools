import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type {} from '@redux-devtools/extension';
import getEventsFromReceivedData from '@pages/telemetry-viewer-page/utils/getEventsFromReceivedData.ts'; // required for devtools typing

interface TelemetryStore {
  displayEvents: TelemetryEventMessage[];
  clearDisplayEvents: () => void;
  events: TelemetryEventMessage[];
  addEvent: (event: TelemetryEventMessage) => void;
  maxEventCount: number;
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
    displayEvents: [],
    clearDisplayEvents: () => set({ displayEvents: [] }),
    events: [],
    addEvent: (event: TelemetryEventMessage) => {
      set((state) => {
        const newEvents = [event, ...state.events];
        const newSpreadEvents = getEventsFromReceivedData(event);
        const newDisplayEvents = [...newSpreadEvents, ...state.displayEvents];
        return {
          // always put the original event at the beginning of the list
          events: newEvents,
          // and splice off if we are over maxEventCount
          displayEvents: newDisplayEvents.splice(0, state.maxEventCount - 1),
        };
      });
    },

    maxEventCount: 10000,
    allowWrap: true,
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

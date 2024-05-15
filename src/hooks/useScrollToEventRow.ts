import { useCallback } from 'react';

export default function useScrollToEventRow() {
  return useCallback((eventId: string) => {
    const element = document.querySelector(`[data-event-id="${eventId}"]`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, []);
}

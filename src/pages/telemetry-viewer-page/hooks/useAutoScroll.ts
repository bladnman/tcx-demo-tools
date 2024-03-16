import { useRef, useEffect, useState, useCallback } from 'react';

interface UseAutoScrollOptions {
  scrollThreshold?: number; // Threshold of scrolling up before disabling auto-scroll
}

const useAutoScroll = ({
  scrollThreshold = 100,
}: UseAutoScrollOptions = {}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [userHasScrolledUp, setUserHasScrolledUp] = useState(false);

  const checkUserScroll = useCallback(() => {
    if (!containerRef.current) return;

    const isUserAboveThreshold =
      containerRef.current.scrollHeight -
        containerRef.current.scrollTop -
        containerRef.current.clientHeight >
      scrollThreshold;

    setUserHasScrolledUp(isUserAboveThreshold);
  }, [scrollThreshold]);

  const scrollToBottom = useCallback(() => {
    if (userHasScrolledUp || !containerRef.current) return;

    const scrollHeight = containerRef.current.scrollHeight;
    containerRef.current.scrollTo({ top: scrollHeight, behavior: 'smooth' });
  }, [userHasScrolledUp]);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', checkUserScroll);

      return () => {
        container.removeEventListener('scroll', checkUserScroll);
      };
    }
  }, [checkUserScroll]);

  return { containerRef, scrollToBottom };
};

export default useAutoScroll;

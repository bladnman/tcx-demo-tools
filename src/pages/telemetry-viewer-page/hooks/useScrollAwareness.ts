import { useState, useEffect, RefObject } from 'react';

const useScrollAwareness = (ref: RefObject<HTMLDivElement>) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = (event: Event) => {
      const target = event.target as HTMLDivElement;
      setIsScrolled(target.scrollTop > 0);
    };

    const element = ref.current;
    if (element) {
      element.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (element) {
        element.removeEventListener('scroll', handleScroll);
      }
    };
  }, [ref]);

  return isScrolled;
};

export default useScrollAwareness;

import { useState, useCallback } from 'react';

const useSubscriptions = <T>() => {
  const [subscriptions, setSubscriptions] = useState<T[]>([]);

  const subscribe = useCallback((subscription: T) => {
    setSubscriptions((prevSubscriptions) => {
      if (!prevSubscriptions.includes(subscription)) {
        return [...prevSubscriptions, subscription];
      }
      return prevSubscriptions;
    });
  }, []);

  const unsubscribe = useCallback((subscription: T) => {
    setSubscriptions((prevSubscriptions) =>
      prevSubscriptions.filter((sub) => sub !== subscription)
    );
  }, []);

  return { subscribe, unsubscribe, subscriptions };
};

export default useSubscriptions;

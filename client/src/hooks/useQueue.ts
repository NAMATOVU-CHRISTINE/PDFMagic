import { useState, useCallback } from 'react';

export function useQueue<T>(initialValue: T[] = []) {
  const [queue, setQueue] = useState(initialValue);

  const enqueue = useCallback((item: T) => {
    setQueue(prev => [...prev, item]);
  }, []);

  const dequeue = useCallback(() => {
    let item: T | undefined;
    setQueue(prev => {
      [item, ...prev] = prev;
      return prev;
    });
    return item;
  }, []);

  const clear = useCallback(() => setQueue([]), []);

  return { queue, enqueue, dequeue, clear, size: queue.length };
}

export default useQueue;

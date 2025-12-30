import { useState, useCallback } from 'react';

export function useSet<T>(initialValue?: Iterable<T>) {
  const [set, setSet] = useState(new Set(initialValue));

  const add = useCallback((item: T) => {
    setSet(prev => new Set(prev).add(item));
  }, []);

  const remove = useCallback((item: T) => {
    setSet(prev => {
      const next = new Set(prev);
      next.delete(item);
      return next;
    });
  }, []);

  const has = useCallback((item: T) => set.has(item), [set]);
  const clear = useCallback(() => setSet(new Set()), []);

  return { set, add, remove, has, clear, size: set.size };
}

export default useSet;

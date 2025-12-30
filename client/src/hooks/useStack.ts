import { useState, useCallback } from 'react';

export function useStack<T>(initialValue: T[] = []) {
  const [stack, setStack] = useState(initialValue);

  const push = useCallback((item: T) => {
    setStack(prev => [...prev, item]);
  }, []);

  const pop = useCallback(() => {
    let item: T | undefined;
    setStack(prev => {
      const next = [...prev];
      item = next.pop();
      return next;
    });
    return item;
  }, []);

  const clear = useCallback(() => setStack([]), []);
  const peek = stack[stack.length - 1];

  return { stack, push, pop, clear, peek, size: stack.length };
}

export default useStack;

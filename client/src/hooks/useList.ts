import { useState, useCallback } from 'react';

export function useList<T>(initialValue: T[] = []) {
  const [list, setList] = useState(initialValue);

  const add = useCallback((item: T) => setList(prev => [...prev, item]), []);
  const remove = useCallback((index: number) => setList(prev => prev.filter((_, i) => i !== index)), []);
  const update = useCallback((index: number, item: T) => setList(prev => prev.map((v, i) => i === index ? item : v)), []);
  const clear = useCallback(() => setList([]), []);
  const reset = useCallback(() => setList(initialValue), [initialValue]);

  return { list, add, remove, update, clear, reset };
}

export default useList;

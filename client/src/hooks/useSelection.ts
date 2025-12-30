import { useState, useCallback } from 'react';

export function useSelection<T>(initialValue: T[] = []) {
  const [selected, setSelected] = useState<T[]>(initialValue);

  const select = useCallback((item: T) => {
    setSelected(prev => prev.includes(item) ? prev : [...prev, item]);
  }, []);

  const deselect = useCallback((item: T) => {
    setSelected(prev => prev.filter(i => i !== item));
  }, []);

  const toggle = useCallback((item: T) => {
    setSelected(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);
  }, []);

  const clear = useCallback(() => setSelected([]), []);
  const isSelected = useCallback((item: T) => selected.includes(item), [selected]);

  return { selected, select, deselect, toggle, clear, isSelected };
}

export default useSelection;

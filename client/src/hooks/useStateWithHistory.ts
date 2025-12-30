import { useState, useCallback, useRef } from 'react';

export function useStateWithHistory<T>(initialValue: T, maxHistory = 10) {
  const [value, setValue] = useState(initialValue);
  const historyRef = useRef<T[]>([initialValue]);
  const pointerRef = useRef(0);

  const set = useCallback((newValue: T) => {
    historyRef.current = historyRef.current.slice(0, pointerRef.current + 1);
    historyRef.current.push(newValue);
    if (historyRef.current.length > maxHistory) historyRef.current.shift();
    pointerRef.current = historyRef.current.length - 1;
    setValue(newValue);
  }, [maxHistory]);

  const undo = useCallback(() => {
    if (pointerRef.current > 0) {
      pointerRef.current--;
      setValue(historyRef.current[pointerRef.current]);
    }
  }, []);

  const redo = useCallback(() => {
    if (pointerRef.current < historyRef.current.length - 1) {
      pointerRef.current++;
      setValue(historyRef.current[pointerRef.current]);
    }
  }, []);

  return { value, set, undo, redo, history: historyRef.current };
}

export default useStateWithHistory;

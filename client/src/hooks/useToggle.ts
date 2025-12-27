import { useState, useCallback } from 'react';

type UseToggleReturn = [boolean, () => void, (value: boolean) => void];

export function useToggle(initialValue = false): UseToggleReturn {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => setValue(v => !v), []);
  const set = useCallback((newValue: boolean) => setValue(newValue), []);

  return [value, toggle, set];
}

export default useToggle;

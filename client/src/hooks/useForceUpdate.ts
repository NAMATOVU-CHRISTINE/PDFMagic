import { useState, useCallback } from 'react';

export function useForceUpdate(): () => void {
  const [, setState] = useState(0);
  return useCallback(() => setState(n => n + 1), []);
}

export default useForceUpdate;

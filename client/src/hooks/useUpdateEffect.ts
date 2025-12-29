import { useEffect, useRef, DependencyList, EffectCallback } from 'react';

export function useUpdateEffect(effect: EffectCallback, deps?: DependencyList): void {
  const isFirstMount = useRef(true);

  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    return effect();
  }, deps);
}

export default useUpdateEffect;

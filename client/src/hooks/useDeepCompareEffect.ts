import { useEffect, useRef, DependencyList, EffectCallback } from 'react';

function deepEqual(a: unknown, b: unknown): boolean {
  return JSON.stringify(a) === JSON.stringify(b);
}

export function useDeepCompareEffect(effect: EffectCallback, deps: DependencyList): void {
  const ref = useRef<DependencyList>();

  if (!deepEqual(deps, ref.current)) {
    ref.current = deps;
  }

  useEffect(effect, ref.current);
}

export default useDeepCompareEffect;

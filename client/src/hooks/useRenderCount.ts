import { useRef } from 'react';

export function useRenderCount(): number {
  const count = useRef(0);
  count.current += 1;
  return count.current;
}

export default useRenderCount;

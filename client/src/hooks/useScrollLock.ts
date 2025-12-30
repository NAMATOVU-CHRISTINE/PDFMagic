import { useCallback, useRef } from 'react';

export function useScrollLock() {
  const scrollPosition = useRef(0);

  const lock = useCallback(() => {
    scrollPosition.current = window.scrollY;
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollPosition.current}px`;
    document.body.style.width = '100%';
  }, []);

  const unlock = useCallback(() => {
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    window.scrollTo(0, scrollPosition.current);
  }, []);

  return { lock, unlock };
}

export default useScrollLock;

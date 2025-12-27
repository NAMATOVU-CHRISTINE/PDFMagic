import { useEffect } from 'react';

export function useDocumentTitle(title: string, restoreOnUnmount = true): void {
  useEffect(() => {
    const originalTitle = document.title;
    document.title = title;

    return () => {
      if (restoreOnUnmount) {
        document.title = originalTitle;
      }
    };
  }, [title, restoreOnUnmount]);
}

export default useDocumentTitle;

import { useState, useCallback } from 'react';

export function useMap<K, V>(initialValue?: Iterable<[K, V]>) {
  const [map, setMap] = useState(new Map(initialValue));

  const set = useCallback((key: K, value: V) => {
    setMap(prev => new Map(prev).set(key, value));
  }, []);

  const remove = useCallback((key: K) => {
    setMap(prev => {
      const next = new Map(prev);
      next.delete(key);
      return next;
    });
  }, []);

  const get = useCallback((key: K) => map.get(key), [map]);
  const clear = useCallback(() => setMap(new Map()), []);

  return { map, set, get, remove, clear, size: map.size };
}

export default useMap;

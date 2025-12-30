export function entries<T>(obj: Record<string, T>): [string, T][] {
  return Object.entries(obj);
}

export function keys<T>(obj: Record<string, T>): string[] {
  return Object.keys(obj);
}

export function values<T>(obj: Record<string, T>): T[] {
  return Object.values(obj);
}

export default entries;

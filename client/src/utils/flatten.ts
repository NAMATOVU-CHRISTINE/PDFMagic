export function flatten<T>(arr: T[][]): T[] {
  return arr.flat();
}

export function flattenDeep<T>(arr: unknown[]): T[] {
  return arr.flat(Infinity) as T[];
}

export default flatten;

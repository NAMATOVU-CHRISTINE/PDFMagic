export function mergeArrays<T>(...arrays: T[][]): T[] {
  return arrays.flat();
}

export function mergeUnique<T>(...arrays: T[][]): T[] {
  return [...new Set(arrays.flat())];
}

export default mergeArrays;

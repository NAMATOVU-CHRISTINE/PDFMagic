export function zip<T, U>(arr1: T[], arr2: U[]): [T, U][] {
  const length = Math.min(arr1.length, arr2.length);
  return Array.from({ length }, (_, i) => [arr1[i], arr2[i]]);
}

export default zip;

export function intersection<T>(arr1: T[], arr2: T[]): T[] {
  const set = new Set(arr2);
  return arr1.filter(item => set.has(item));
}

export default intersection;

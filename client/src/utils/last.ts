export function last<T>(arr: T[]): T | undefined {
  return arr[arr.length - 1];
}

export function first<T>(arr: T[]): T | undefined {
  return arr[0];
}

export default last;

export function removeBy<T>(arr: T[], key: keyof T, value: unknown): T[] {
  return arr.filter(item => item[key] !== value);
}

export function removeAt<T>(arr: T[], index: number): T[] {
  return arr.filter((_, i) => i !== index);
}

export default removeBy;

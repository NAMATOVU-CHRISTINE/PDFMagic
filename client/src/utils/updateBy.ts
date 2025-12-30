export function updateBy<T>(arr: T[], key: keyof T, value: unknown, updates: Partial<T>): T[] {
  return arr.map(item => item[key] === value ? { ...item, ...updates } : item);
}

export default updateBy;

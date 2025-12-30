export function filterBy<T>(arr: T[], key: keyof T, value: unknown): T[] {
  return arr.filter(item => item[key] === value);
}

export function filterByMultiple<T>(arr: T[], filters: Partial<T>): T[] {
  return arr.filter(item =>
    Object.entries(filters).every(([key, value]) => item[key as keyof T] === value)
  );
}

export default filterBy;

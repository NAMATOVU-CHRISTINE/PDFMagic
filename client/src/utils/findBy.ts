export function findBy<T>(arr: T[], key: keyof T, value: unknown): T | undefined {
  return arr.find(item => item[key] === value);
}

export function findIndexBy<T>(arr: T[], key: keyof T, value: unknown): number {
  return arr.findIndex(item => item[key] === value);
}

export default findBy;

export function maxBy<T>(arr: T[], key: keyof T): T | undefined {
  return arr.reduce((max, item) => (item[key] > max[key] ? item : max), arr[0]);
}

export default maxBy;

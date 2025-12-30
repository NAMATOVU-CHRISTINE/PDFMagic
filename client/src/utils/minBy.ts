export function minBy<T>(arr: T[], key: keyof T): T | undefined {
  return arr.reduce((min, item) => (item[key] < min[key] ? item : min), arr[0]);
}

export default minBy;

export function sumBy<T>(arr: T[], key: keyof T): number {
  return arr.reduce((sum, item) => sum + Number(item[key]), 0);
}

export default sumBy;

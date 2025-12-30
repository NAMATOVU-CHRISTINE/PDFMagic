export function averageBy<T>(arr: T[], key: keyof T): number {
  if (arr.length === 0) return 0;
  return arr.reduce((sum, item) => sum + Number(item[key]), 0) / arr.length;
}

export default averageBy;

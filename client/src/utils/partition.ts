export function partition<T>(arr: T[], predicate: (item: T) => boolean): [T[], T[]] {
  const pass: T[] = [];
  const fail: T[] = [];
  arr.forEach(item => (predicate(item) ? pass : fail).push(item));
  return [pass, fail];
}

export default partition;

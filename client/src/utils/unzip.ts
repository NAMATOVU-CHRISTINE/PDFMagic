export function unzip<T, U>(pairs: [T, U][]): [T[], U[]] {
  return [pairs.map(p => p[0]), pairs.map(p => p[1])];
}

export default unzip;

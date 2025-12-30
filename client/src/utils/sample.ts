export function sample<T>(arr: T[]): T | undefined {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default sample;

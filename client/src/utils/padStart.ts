export function padStart(str: string | number, length: number, char = '0'): string {
  return String(str).padStart(length, char);
}

export default padStart;

export function truncate(str: string, maxLength: number, suffix = '...'): string {
  if (!str || str.length <= maxLength) return str;
  return str.slice(0, maxLength - suffix.length) + suffix;
}

export function truncateMiddle(str: string, maxLength: number): string {
  if (!str || str.length <= maxLength) return str;
  const half = Math.floor((maxLength - 3) / 2);
  return str.slice(0, half) + '...' + str.slice(-half);
}

export default truncate;

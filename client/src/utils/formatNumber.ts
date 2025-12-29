export function formatNumber(num: number, locale = 'en-US'): string {
  return new Intl.NumberFormat(locale).format(num);
}

export function formatCurrency(num: number, currency = 'USD', locale = 'en-US'): string {
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(num);
}

export function formatPercent(num: number, decimals = 0): string {
  return `${(num * 100).toFixed(decimals)}%`;
}

export default formatNumber;

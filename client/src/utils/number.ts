export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat().format(num);
};

export const clamp = (num: number, min: number, max: number): number => {
  return Math.min(Math.max(num, min), max);
};
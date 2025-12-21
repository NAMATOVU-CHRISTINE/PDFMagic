export const getQueryParam = (param: string): string | null => {
  const params = new URLSearchParams(window.location.search);
  return params.get(param);
};

export const buildUrl = (base: string, params: Record<string, string>): string => {
  const url = new URL(base);
  Object.entries(params).forEach(([key, value]) => url.searchParams.append(key, value));
  return url.toString();
};
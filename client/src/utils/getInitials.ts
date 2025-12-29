export function getInitials(name: string, maxLength = 2): string {
  if (!name) return '';
  
  return name
    .split(' ')
    .map(word => word[0])
    .filter(Boolean)
    .slice(0, maxLength)
    .join('')
    .toUpperCase();
}

export default getInitials;

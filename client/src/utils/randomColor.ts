export function randomColor(): string {
  return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
}

export function randomHSL(saturation = 70, lightness = 60): string {
  const hue = Math.floor(Math.random() * 360);
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

export default randomColor;

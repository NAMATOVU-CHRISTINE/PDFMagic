export function scrollToTop(smooth = true): void {
  window.scrollTo({
    top: 0,
    behavior: smooth ? 'smooth' : 'auto',
  });
}

export function scrollToElement(elementId: string, smooth = true): void {
  const element = document.getElementById(elementId);
  element?.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto' });
}

export default scrollToTop;

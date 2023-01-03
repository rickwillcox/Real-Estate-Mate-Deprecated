export function fadeOutElement(element: HTMLElement) {
  setTimeout(() => {
    element.style.visibility = "hidden";
    element.style.opacity = "0";
    element.style.height = "0";
  }, 5);
}

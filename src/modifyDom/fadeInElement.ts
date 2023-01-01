export function fadeInElement(element: HTMLElement) {
  setTimeout(() => {
    element.style.visibility = "visible";
    element.style.opacity = "1";
    element.style.height = "auto";
  }, 5);
}

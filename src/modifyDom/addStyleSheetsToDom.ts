export function addStyleSheetsToDom() {
  const cssFiles = [
    "mainContainerStyles.css",
    "animations.css",
    "timeline.css",
  ];
  cssFiles.forEach((cssFile) => {
    const linkElement = document.createElement("link");
    linkElement.rel = "stylesheet";
    linkElement.type = "text/css";
    linkElement.href = chrome.runtime.getURL(cssFile);
    document.head.appendChild(linkElement);
  });
}

import { fgLog } from "../utils";

export function addStyleSheetsToDom() {
  fgLog("addStyleSheetsToDom start");
  const cssFiles = ["mainContainerStyles.css", "animations.css"];
  cssFiles.forEach((cssFile) => {
    const linkElement = document.createElement("link");
    linkElement.rel = "stylesheet";
    linkElement.type = "text/css";
    linkElement.href = chrome.runtime.getURL(cssFile);
    fgLog(linkElement);
    document.head.appendChild(linkElement);
  });
  fgLog("addStyleSheetsToDom end");
}

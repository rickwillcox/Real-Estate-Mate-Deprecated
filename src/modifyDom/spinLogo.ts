import { fgLog } from "../utils";

export function spinLogo() {
  fgLog("spinLogo start");
  const img = document.getElementsByClassName(
    "real-estate-mate-logo"
  )[0] as HTMLImageElement;
  img.style.animationName = "none";
  img.style.animationName = "spin";
  img.style.animationIterationCount = "1";
  img.style.animationDuration = "0.5s";
  fgLog("spinLogo end", img);
}
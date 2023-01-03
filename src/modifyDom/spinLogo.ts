export function spinLogo() {
  const img = document.getElementsByClassName(
    "rem-logo"
  )[0] as HTMLImageElement;
  img.style.animationName = "none";
  img.style.animationName = "spin";
  img.style.animationIterationCount = "1";
  img.style.animationDuration = "0.5s";
}

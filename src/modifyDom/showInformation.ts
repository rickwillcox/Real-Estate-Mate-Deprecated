import { fgLog } from "../utils";

export function showInformation() {
  fgLog("showInformation start");
  // const priceRangeElement = document.querySelector(
  //   ".rem-price-range"
  // ) as HTMLElement;
  // const bankEstElement = document.querySelector(
  //   ".rem-bank-est"
  // ) as HTMLElement;
  // const internetElement = document.querySelector(
  //   ".rem-internet"
  // ) as HTMLElement;
  const listingUpdatesElement = document.querySelector(
    ".rem-listing-updates"
  ) as HTMLElement;

  const elements = [
    // priceRangeElement,
    // bankEstElement,
    // internetElement,
    listingUpdatesElement,
  ];
  elements.forEach((element) => {
    if (!element) {
      fgLog("showInformation (!element)", element);
      return;
    }
    element.style.visibility = "visible";
    element.style.opacity = "1";
    element.style.height = "auto";
  });
  fgLog("showInformation end");
}

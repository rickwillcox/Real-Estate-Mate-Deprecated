import { fgLog } from "../utils";

export function showInformation() {
  fgLog("showInformation start");
  // const priceRangeElement = document.querySelector(
  //   ".real-estate-mate-price-range"
  // ) as HTMLElement;
  // const bankEstElement = document.querySelector(
  //   ".real-estate-mate-bank-est"
  // ) as HTMLElement;
  // const internetElement = document.querySelector(
  //   ".real-estate-mate-internet"
  // ) as HTMLElement;
  const listingUpdatesElement = document.querySelector(
    ".real-estate-mate-listing-updates"
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

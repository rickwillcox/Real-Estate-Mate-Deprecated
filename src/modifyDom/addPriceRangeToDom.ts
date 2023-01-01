import { fadeInElement } from ".";
import { fgLog } from "../utils";

export function addPriceRangeToDom(backgroundFunctions: any) {
  fgLog("addPriceRangeToDom start", backgroundFunctions);
  const regex =
    /marketing_price_range\\\\\\\\\\\\\\":\\\\\\\\\\\\\\"(.*?)\\\\\\\\\\\\\\"/;
  const matches = document.documentElement.innerHTML.match(regex);

  if (matches === null) {
    document.getElementsByClassName(
      "rem-price-range-inner"
    )[0].innerHTML = `No price range available`;
    fgLog("addPriceRangeToDom early return (matches === null) end");
    return;
  }
  document.getElementsByClassName(
    "rem-price-range-inner"
  )[0].innerHTML = `${matches[1].replace("_", " - ")}`;

  let split_price = matches[1].split("_");
  if (split_price.length === 2) {
    backgroundFunctions.updateBackend.args.minPrice = split_price[0];
    backgroundFunctions.updateBackend.args.maxPrice = split_price[1];
  } else {
    backgroundFunctions.updateBackend.args.minPrice = split_price[0];
    backgroundFunctions.updateBackend.args.maxPrice = split_price[0];
  }
  const priceRangeElement = document.querySelector(
    ".rem-price-range"
  ) as HTMLElement;

  fadeInElement(priceRangeElement);
  fgLog("addPriceRangeToDom end");
}

import { fadeInElement } from ".";
import { fgLog, priceRangeElement, priceRangeInnerElement } from "../utils";

export function addPriceRangeToDom(backgroundFunctions: any) {
  fgLog("addPriceRangeToDom start", backgroundFunctions);
  const regex =
    /marketing_price_range\\\\\\\\\\\\\\":\\\\\\\\\\\\\\"(.*?)\\\\\\\\\\\\\\"/;
  const matches = document.documentElement.innerHTML.match(regex);

  if (matches === null) {
    priceRangeInnerElement().innerHTML = `No price range available`;
    fgLog("addPriceRangeToDom early return (matches === null) end");
    return;
  }
  priceRangeInnerElement().innerHTML = `${matches[1].replace("_", " - ")}`;

  let split_price = matches[1].split("_");
  if (split_price.length === 2) {
    backgroundFunctions.updateBackend.args.minPrice = split_price[0];
    backgroundFunctions.updateBackend.args.maxPrice = split_price[1];
  } else {
    backgroundFunctions.updateBackend.args.minPrice = split_price[0];
    backgroundFunctions.updateBackend.args.maxPrice = split_price[0];
  }

  fadeInElement(priceRangeElement());
  fgLog("addPriceRangeToDom end");
}

import { fadeInElement } from ".";
import { priceRangeInnerElement } from "../utils";

export function addPriceRangeToDom(backgroundFunctions: any) {
  const regex =
    /marketing_price_range\\\\\\\\\\\\\\":\\\\\\\\\\\\\\"(.*?)\\\\\\\\\\\\\\"/;
  const matches = document.documentElement.innerHTML.match(regex);

  if (matches === null) {
    priceRangeInnerElement().innerHTML = `No price range available`;
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
  fadeInElement(priceRangeInnerElement());
}

export function getPriceInfo() {
  const priceInfo = document.getElementsByClassName(
    "property-price property-info__price"
  )[0].innerHTML;
  return priceInfo;
}

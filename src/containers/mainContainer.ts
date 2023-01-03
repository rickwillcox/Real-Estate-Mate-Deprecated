import { internetListContainer } from ".";

const logoData = {
  src: chrome.runtime.getURL("/logo/logo-128.png"),
  alt: "logo",
  height: "50",
  width: "50",
};

const titleText = "Real Estate Mate";
const priceRangeText = "Price Range: ";
const bankEstText = "Bank Est: ";
const internetText = "Internet: ";
const internetDefaultLink =
  "https://www.nbnco.com.au/connect-home-or-business/check-your-address";
const listingUpdatesText = "Listing Timeline: ";

const loadingAnimation = `
  <span class="rem-loading">
    <span class="rem-dot"></span>
    <span class="rem-dot"></span>
    <span class="rem-dot"></span>
  </span>
`;

function genLoadingSpan(className: string) {
  return `<span class="${className}">${loadingAnimation}</span>`;
}

const mainContainer = `
  <div class="real-estate-mate">
    <h3 class="rem-title">${titleText}</h3>
    <img class="rem-logo" src="${logoData.src}" alt="${logoData.alt}" height="${
  logoData.height
}" width="${logoData.width}"/>
    <h6 class="rem-price-range">${priceRangeText}<span class="rem-price-range-inner"></span></h6>
    <h6 class="rem-bank-est">${bankEstText}
      <a class="rem-bank-est-inner" target="blank" href=""></a>${genLoadingSpan(
        "rem-bank-loading"
      )}</h6>
    <div class="rem-internet">${internetText}
      ${genLoadingSpan("rem-internet-loading")}
      <a class="rem-internet-not-available" target="blank" href="${internetDefaultLink}">Not Available</a>
      ${internetListContainer}
    </div>
    <div class="rem-listing-updates">
      ${listingUpdatesText}
      ${genLoadingSpan("rem-listing-updates-loading")}
    </div>
  </div>
`;

export { mainContainer };

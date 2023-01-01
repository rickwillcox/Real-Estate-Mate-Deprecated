import { fgLog } from "../utils";
import { internetListContainer } from ".";

fgLog("mainContainer.ts start");
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

const mainContainer = `
  <div class="real-estate-mate" style="border-width: 3px; border-style: solid; border-color: black; padding: 10px;">
    <h3 class="real-estate-mate-title">${titleText}</h3>
    <img class="real-estate-mate-logo" src="${logoData.src}" alt="${logoData.alt}" height="${logoData.height}" width="${logoData.width}"/>
    <h6 class="real-estate-mate-price-range">${priceRangeText}<span class="real-estate-mate-price-range-inner"></span></h6>
    <h6 class="real-estate-mate-bank-est">${bankEstText}<a class="real-estate-mate-bank-est-inner" target="blank" href=""></a></h6>
    <div class="real-estate-mate-internet">${internetText}<a class="real-estate-mate-internet-est-inner" target="blank" href="${internetDefaultLink}">Not Available</a>${internetListContainer}</div>
    <div class="real-estate-mate-listing-updates"></div>
  </div>
`;
fgLog("mainContainer.ts start");

export { mainContainer };

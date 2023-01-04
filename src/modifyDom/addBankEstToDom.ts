import { foregroundStore } from "../stores";
import { bankEstElementInner, bankLoadingElement } from "../utils";
import { fadeInElement } from "./fadeInElement";
import { fadeOutElement } from "./fadeOutElement";

export function addBankEstToDom(data: any[]) {
  const estimate = data[0];
  const domainId = data[1];
  const { getState, setState } = foregroundStore;

  let link = `https://www.commbank.com.au/digital/home-buying/property/${domainId}?byAddress=true`;
  if (!domainId) {
    link = "https://www.commbank.com.au/digital/home-buying/search";
  }
  if (getState().commbankPriceComplete) return;
  setState({ commbankPriceComplete: true });

  bankEstElementInner().innerHTML =
    estimate === null ? "Not Available" : "$" + estimate;
  bankEstElementInner().href = link;
  // bankLoadingElement().remove();
  // fadeInElement(bankEstElementInner());
  bankEstElementInner().style.visibility = "visible";
  bankEstElementInner().style.opacity = "1";
  bankEstElementInner().style.height = "auto";
}

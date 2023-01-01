import { foregroundStore } from "../stores";
import { bankEstElement, bankEstElementInner, fgLog } from "../utils";
import { fadeInElement } from "./fadeInElement";

export function addBankEstToDom(data: any[]) {
  fgLog("addBankEstToDom start", data);
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

  fadeInElement(bankEstElement());
  fgLog("addBankEstToDom end");
}

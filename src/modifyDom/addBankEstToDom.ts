import { foregroundStore } from "../stores";
import { fgLog } from "../utils";
import { fadeInElement } from "./fadeInElement";

export function addBankEstToDom(data: any[]) {
  fgLog("addBankEstToDom start", data);
  const estimate = data[0];
  const domainId = data[1];
  const { getState, setState, subscribe, destroy } = foregroundStore;

  let link = `https://www.commbank.com.au/digital/home-buying/property/${domainId}?byAddress=true`;
  if (!domainId) {
    link = "https://www.commbank.com.au/digital/home-buying/search";
  }
  if (getState().commbankPriceComplete) return;
  setState({ commbankPriceComplete: true });
  const bankEstElementInner = document.getElementsByClassName(
    "rem-bank-est-inner"
  )[0] as HTMLAnchorElement;
  bankEstElementInner.innerHTML =
    estimate === null ? "Not Available" : "$" + estimate;
  bankEstElementInner.href = link;

  const bankEstElement = document.querySelector(".rem-bank-est") as HTMLElement;
  fadeInElement(bankEstElement);
  fgLog("addBankEstToDom end");
}

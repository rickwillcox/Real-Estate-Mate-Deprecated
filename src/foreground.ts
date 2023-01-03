import {
  addStyleSheetsToDom,
  addRealEstateMateContainer,
  addPriceRangeToDom,
  addBankEstToDom,
  addNbnToDom,
  spinLogo,
  addListingUpdatesToDom,
} from "./modifyDom";
import { backgroundFunctionsStore, foregroundStore } from "./stores";
import { getUrlFromPage } from "./utils";

const { getState, setState } = foregroundStore;
const { getState: bgfGetState, setState: bgfSetState } =
  backgroundFunctionsStore;

chrome.runtime.onMessage.addListener(function (msg) {
  switch (msg.functionName) {
    case "onTabUpdated": {
      setState;
      bgfGetState().setTabId(msg.data);
      bgfSetState({
        backgroundFunctions: {
          ...bgfGetState().backgroundFunctions,
          updateBackend: {
            ...bgfGetState().backgroundFunctions.updateBackend,
            args: {
              ...bgfGetState().backgroundFunctions.updateBackend.args,
              link: getUrlFromPage(),
            },
          },
        },
      });
      if (!getState().allFetchingComplete) initRealEstateMate();

      break;
    }
    case "getCommbankPrice": {
      addBankEstToDom(msg.data);
      break;
    }
    case "getNbnData": {
      addNbnToDom(msg.data);
    }
    case "updateBackend": {
      break;
    }
    case "getListingUpdates": {
      addListingUpdatesToDom(msg.data);
      break;
    }
    default:
      break;
  }
  checkAllFetchComplete();
  return;
});

async function initRealEstateMate() {
  addRealEstateMateContainer();
  addStyleSheetsToDom();
  addRealEstateMateContainer();
  addPriceRangeToDom(bgfGetState().backgroundFunctions);
  chrome.runtime.sendMessage(
    bgfGetState().backgroundFunctions.getCommbankPrice
  );
  chrome.runtime.sendMessage(bgfGetState().backgroundFunctions.getNbnData);
  chrome.runtime.sendMessage(bgfGetState().backgroundFunctions.updateBackend);
  chrome.runtime.sendMessage(
    bgfGetState().backgroundFunctions.getListingUpdates
  );
}

function checkAllFetchComplete() {
  if (!getState().commbankPriceComplete) return;
  if (!getState().nbnDataComplete) return;
  spinLogo();
  setState({ allFetchingComplete: true });
}

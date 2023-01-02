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
import { getUrlFromPage, fgLog } from "./utils";

const { getState, setState } = foregroundStore;
const { getState: bgfGetState, setState: bgfSetState } =
  backgroundFunctionsStore;

chrome.runtime.onMessage.addListener(function (msg) {
  fgLog("chrome.runtime.onMessage.addListener start", msg.functionName);
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
      fgLog("getListingUpdates foreground:", msg.functionName, msg.data, "hl");
      addListingUpdatesToDom(msg.data);
      break;
    }
    default:
      break;
  }
  checkAllFetchComplete();
  fgLog("chrome.runtime.onMessage.addListener end", msg.functionName);
  return;
});

async function initRealEstateMate() {
  fgLog("initRealEstateMate start");
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
  fgLog("initRealEstateMate end");
}

function checkAllFetchComplete() {
  fgLog("checkAllFetchComplete start", getState());
  if (!getState().commbankPriceComplete) return;
  if (!getState().nbnDataComplete) return;
  spinLogo();
  setState({ allFetchingComplete: true });
  fgLog("allFetchingComplete", getState());
}

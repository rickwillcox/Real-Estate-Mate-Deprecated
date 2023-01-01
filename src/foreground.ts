import { FgToBgFunctions } from "./interfaces";
import {
  addStyleSheetsToDom,
  addRealEstateMateContainer,
  addPriceRangeToDom,
  addBankEstToDom,
  addNbnToDom,
  showInformation,
  spinLogo,
} from "./modifyDom";
import { foregroundStore } from "./stores";
import {
  createGetAddressFunction,
  getUrlFromPage,
  getPriceInfo,
  fgLog,
  bgLog,
} from "./utils";

const { getState, setState, subscribe, destroy } = foregroundStore;

const getAddress = createGetAddressFunction();

const backgroundFunctions: FgToBgFunctions = {
  onTabUpdated: {
    name: "onTabUpdated",
    args: "",
  },
  getCommbankPrice: {
    name: "getCommbankPrice",
    args: {
      address: getAddress(false),
      tabId: "",
    },
  },
  getNbnData: {
    name: "getNbnData",
    args: {
      address: getAddress(false),
      tabId: "",
    },
  },
  updateBackend: {
    name: "updateBackend",
    args: {
      address: getAddress(true),
      link: "",
      price: getPriceInfo(),
      minPrice: "",
      maxPrice: "null",
      title: "some title",
      tabId: "",
    },
  },
  getListingUpdates: {
    name: "getListingUpdates",
    args: {
      address: getAddress(true),
      tabId: "",
    },
  },
};

chrome.runtime.onMessage.addListener(function (msg) {
  fgLog("chrome.runtime.onMessage.addListener start", msg.functionName);
  switch (msg.functionName) {
    case "onTabUpdated": {
      backgroundFunctions.getCommbankPrice.args.tabId = msg.data;
      backgroundFunctions.getNbnData.args.tabId = msg.data;
      backgroundFunctions.updateBackend.args.tabId = msg.data;
      backgroundFunctions.updateBackend.args.link = getUrlFromPage();
      backgroundFunctions.getListingUpdates.args.tabId = msg.data;
      if (!getState().allFetchingComplete) initRealEstateMate();

      break;
    }
    case "getCommbankPrice": {
      // bgLog(msg.data[0], ...(msg.data ?? ""));
      addBankEstToDom(msg.data);
      break;
    }
    case "getNbnData": {
      // bgLog("getNbnData", ...(msg.data ?? ""));
      addNbnToDom(msg.data);
    }
    case "updateBackend": {
      break;
    }
    case "getListingUpdates": {
      fgLog("getListingUpdates foreground:", msg.functionName, msg.data);
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
  addPriceRangeToDom(backgroundFunctions);
  chrome.runtime.sendMessage(backgroundFunctions.getCommbankPrice);
  chrome.runtime.sendMessage(backgroundFunctions.getNbnData);
  chrome.runtime.sendMessage(backgroundFunctions.updateBackend);
  chrome.runtime.sendMessage(backgroundFunctions.getListingUpdates);
  fgLog("initRealEstateMate end");
}

function checkAllFetchComplete() {
  fgLog("checkAllFetchComplete start", getState());
  if (!getState().commbankPriceComplete) return;
  if (!getState().nbnDataComplete) return;
  spinLogo();
  showInformation();
  setState({ allFetchingComplete: true });
  fgLog("allFetchingComplete", getState());
}

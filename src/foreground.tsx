import {
  addStyleSheetsToDom,
  addRealEstateMateContainer,
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
    case "getTestComponent": {
      console.log("FOREGROUND: getTestComponent", msg.data);
      addRealEstateMateContainer(msg.data);
      break;
    }
    default:
      break;
  }
  checkAllFetchComplete();
  return;
});

// function injectHTML() {
//   // Read the contents of the file
//   console.log("injectHTML BEFORE");

//   var xhr = new XMLHttpRequest();
//   xhr.open("GET", chrome.runtime.getURL("inject.html"), true);
//   console.log("injectHTML AFTER REQUEST");

//   xhr.onreadystatechange = function () {
//     if (this.readyState !== 4) {
//       return;
//     }
//     console.log("injectHTML READY", this.responseText);
//     // Inject the HTML into the page
//     propertyInfoMiddleContentElement().innerHTML += this.responseText;
//     console.log("injectHTML END");
//     const exists = document.getElementsByClassName("rem-test-component")[0];
//     console.log("!!!!!", exists);
//     if (exists) {
//       console.log("EXISTS!!!");
//       exists.addEventListener("click", remHandleClick);
//     }
//     const counterText = document.getElementsByClassName("rem-counter")[0];
//     counterText.innerHTML = counter.toString();
//   };
//   xhr.send();
// }

let counter = 0;

// function remHandleClick() {
//   console.log("THIS FUCKING WORKED???? remHandleClick");
//   const counterText = document.getElementsByClassName("rem-counter")[0];
//   counter += 1;
//   counterText.innerHTML = counter.toString();
// }

async function initRealEstateMate() {
  // addRealEstateMateContainer();
  // ReactDOM.render(<TestComponent />, propertyInfoMiddleContentElement());
  // const button = document.getElementsByClassName("test-component")[0];
  // console.log(button);
  // button.addEventListener("click", () => {
  //   console.log("clicked");
  // });

  addStyleSheetsToDom();
  // addRealEstateMateContainer();
  // injectHTML();

  chrome.runtime.sendMessage(
    bgfGetState().backgroundFunctions.getTestComponent
  );

  // addPriceRangeToDom(bgfGetState().backgroundFunctions);
  chrome.runtime.sendMessage(
    bgfGetState().backgroundFunctions.getCommbankPrice
  );
  // chrome.runtime.sendMessage(bgfGetState().backgroundFunctions.getNbnData);
  // chrome.runtime.sendMessage(bgfGetState().backgroundFunctions.updateBackend);
  // chrome.runtime.sendMessage(
  //   bgfGetState().backgroundFunctions.getListingUpdates
  // );
}

function checkAllFetchComplete() {
  if (!getState().commbankPriceComplete) return;
  if (!getState().nbnDataComplete) return;
  spinLogo();
  setState({ allFetchingComplete: true });
}

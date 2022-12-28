function addStylesToDom() {
  const style = document.createElement("style");
  style.innerHTML = `
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes growShrink {
  0% {
    transform: scale(0.8);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(0.8);
  }
}
@keyframes roll-forward {
  from {
    transform: translateX(-100%) rotate(0deg);
  }
  to {
    transform: translateX(calc(100% + 50px)) rotate(360deg);
  }
}

@keyframes roll-backward {
  from {
    transform: translateX(calc(100% + 50px)) rotate(360deg);
  }
  to {
    transform: translateX(-100%) rotate(0deg);
  }
}
`;
  document.head.appendChild(style);
}

function addRealEstateMateContainer() {
  if (document.getElementsByClassName("real-estate-mate").length > 0) {
    //remove it
    document.getElementsByClassName("real-estate-mate")[0].remove();
  }
  document.getElementsByClassName(
    "property-info__middle-content"
  )[0].innerHTML += ` 
  <div class="real-estate-mate" style="border-width: 3px; border-style: solid; border-color: black; padding: 10px;">
    <h3 class="real-estate-mate-title" style="text-align: center;">Real Estate Mate</h3>
  <img class="real-estate-mate-logo" src="${chrome.runtime.getURL(
    "/logo/logo-128.png"
  )}" alt="logo" height="50" width="50" style="animation: growShrink 1.2s linear infinite; display: block; margin : auto;"/>
    <h6 class="real-estate-mate-price-range" style="visibility: hidden; opacity: 0; transition: opacity 1s ease-in-out; height: 0">Price Range: </h6>
    <h6 class="real-estate-mate-bank-est" style="visibility: hidden; opacity: 0; transition: opacity 1s ease-in-out; height: 0">Bank Est: </h6>
    <div class="real-estate-mate-internet" style="visibility: hidden; opacity: 0; transition: opacity 1s ease-in-out; height: 0">Internet: <ul class="real-estate-mate-internet-list" style="list-style-type: disc; padding-left: 40px"></ul></div>
  </div>`;
}

function addPriceRangeToDom() {
  document.getElementsByClassName(
    "real-estate-mate-price-range"
  )[0].innerHTML += `${document.documentElement.innerHTML
    .match(/\d+(\.\d+)?(m|k)_\d+(\.\d+)?(m|k)/)[0]
    .replace("_", " - ")}`;
}

function addBankEstToDom(data) {
  const estimate = data[0];
  const domainId = data[1];
  console.log(estimate, domainId);
  if (getCommbankPriceComplete) return;
  getCommbankPriceComplete = true;
  if (!estimate) {
    document.getElementsByClassName(
      "real-estate-mate-bank-est"
    )[0].innerHTML += ` No Estimate`;
    return;
  }
  document.getElementsByClassName(
    "real-estate-mate-bank-est"
  )[0].innerHTML += ` <a  style="color: blue" target="blank" href="https://www.commbank.com.au/digital/home-buying/property/${domainId}?byAddress=true"> $${estimate}</a>`;
}

function addNbnToDom(data) {
  let primaryAccessTechnology = data.primaryAccessTechnology;
  const speed = data.speed;
  const lowerSpeed = data.lowerSpeed;
  const upperSpeed = data.upperSpeed;
  const coExistance = data.networkCoexistence.toLowerCase() === "yes";

  let primaryAccessTechnologyLink;
  switch (primaryAccessTechnology.toLowerCase()) {
    case "fibre to the premises":
      primaryAccessTechnologyLink =
        "https://www.nbnco.com.au/learn/network-technology/fibre-to-the-premises-explained-fttp";
      primaryAccessTechnology = "FTTP";
      break;
    case "fibre to the node":
      primaryAccessTechnologyLink =
        "https://www.nbnco.com.au/learn/network-technology/fibre-to-the-node-explained-fttn";
      primaryAccessTechnology = "FTTN";
      break;
    case "fibre to the curb":
      primaryAccessTechnologyLink =
        "https://www.nbnco.com.au/learn/network-technology/fibre-to-the-curb-explained-fttc";
      primaryAccessTechnology = "FTTC";
      break;
    case "fibre to the building":
      primaryAccessTechnologyLink =
        "https://www.nbnco.com.au/learn/network-technology/fibre-to-the-building-explained-fttb";
      primaryAccessTechnology = "FTTB";
      break;
    case "hybrid fibre coaxil":
      primaryAccessTechnologyLink =
        "https://www.nbnco.com.au/learn/network-technology/hybrid-fibre-coaxial-explained-hfc-3";
      primaryAccessTechnology = "HFC";
      break;
    default:
      primaryAccessTechnologyLink =
        "https://www.nbnco.com.au/learn/network-technology";
      primaryAccessTechnology = "N/A";
  }
  console.log(
    primaryAccessTechnology,
    primaryAccessTechnologyLink,
    speed,
    coExistance
  );

  getNbnDataComplete = true;
  let list = document.getElementsByClassName(
    "real-estate-mate-internet-list"
  )[0];
  const blackSquare =
    "url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNCIgaGVpZ2h0PSIxNCI+PHJlY3Qgd2lkdGg9IjE0IiBoZWlnaHQ9IjE0IiBmaWxsPSJibGFjayIvPjwvc3ZnPg==)";

  if (speed) {
    let speedItem = document.createElement("li");
    speedItem.textContent = `${speed} mbps`;
    speedItem.style.color =
      speed < 25 ? "red" : speed < 50 ? "orange" : "green";
    if (lowerSpeed && upperSpeed) {
      speedItem.textContent = `${lowerSpeed} - ${upperSpeed} mbps`;
      speedItem.style.color =
        upperSpeed < 25 ? "red" : upperSpeed < 50 ? "orange" : "green";
    }

    speedItem.style.listStyleImage = blackSquare;
    list.appendChild(speedItem);
  }

  //change the color of only the text not the dot point

  if (primaryAccessTechnology) {
    let primaryAccessTechnologyItem = document.createElement("li");
    primaryAccessTechnologyItem.style.listStyleImage = blackSquare;
    primaryAccessTechnologyItem.innerHTML = `<a  style="color: blue" target="blank" href="${primaryAccessTechnologyLink}">${primaryAccessTechnology}</a>`;
    list.appendChild(primaryAccessTechnologyItem);
  }

  if (coExistance) {
    let coExistanceItem = document.createElement("li");
    coExistanceItem.style.listStyleImage = blackSquare;
    coExistanceItem.innerHTML = `<a  style="color: red" target="blank" href="https://help.australiabroadband.com.au/support/solutions/articles/44000688641-what-is-co-existence-and-why-does-it-affect-my-internet-speed-">Co-Existance</a>`;
    list.appendChild(coExistanceItem);
  }
}

function createGetAddressFunction() {
  let address = null;
  return function () {
    if (address) return address;
    const metaTags = document.getElementsByTagName("meta");
    let fullAddress = Array.prototype.reduce.call(
      metaTags,
      function (acc, metaTag) {
        if (metaTag.getAttribute("property") == "og:title") {
          return metaTag.getAttribute("content");
        } else {
          return acc;
        }
      },
      null
    );
    const splitAddress = fullAddress.split(",");
    address = splitAddress[0] + ", " + splitAddress[1];
    return address;
  };
}

const getAddress = createGetAddressFunction();
let tabId = null;
const backgroundFunctions = {
  getTabId: {
    name: "onTabActivated",
    args: null,
  },
  onTabUpdated: {
    name: "onTabUpdated",
    args: null,
  },
  getCommbankPrice: {
    name: "getCommbankPrice",
    args: {
      address: getAddress(),
      tabId: tabId,
    },
  },
  getNbnData: {
    name: "getNbnData",
    args: {
      address: getAddress(),
      tabId: tabId,
    },
  },
};

chrome.runtime.onMessage.addListener(function (msg, callback) {
  switch (msg.functionName) {
    case "onTabActivated": {
      console.log("😋, foreground data getTabId", msg.data);
      tabId = msg.data;
      initRealEstateMate();
      break;
    }
    case "onTabUpdated": {
      console.log("😋, foreground data onTabUpdated", msg.data);
      tabId = msg.data;

      initRealEstateMate();
      break;
    }
    case "getCommbankPrice": {
      console.log("😋, foreground data getCommbankPrice", msg.data);
      addBankEstToDom(msg.data);
      break;
    }
    case "getNbnData": {
      console.log("😋, foreground data getNbnData", msg.data);
      addNbnToDom(msg.data);
    }
    default:
      break;
  }
  checkAllFetchComplete();
  return;
});

let getCommbankPriceComplete = false;
let getNbnDataComplete = false;

async function initRealEstateMate() {
  getCommbankPriceComplete = false;
  getNbnDataComplete = false;
  addStylesToDom();
  addRealEstateMateContainer();
  addPriceRangeToDom();

  chrome.runtime.sendMessage(backgroundFunctions.getCommbankPrice);
  chrome.runtime.sendMessage(backgroundFunctions.getNbnData);
}

function checkAllFetchComplete() {
  if (!getCommbankPriceComplete) return;
  if (!getNbnDataComplete) return;
  startSpin();
}

const img = document.getElementsByClassName("real-estate-mate-logo")[0];

img.addEventListener("animationend", function () {
  const priceRangeElement = document.querySelector(
    ".real-estate-mate-price-range"
  );
  const bankEstElement = document.querySelector(".real-estate-mate-bank-est");
  const internetElement = document.querySelector(".real-estate-mate-internet");

  const elements = [priceRangeElement, bankEstElement, internetElement];
  elements.forEach((element) => {
    element.style.visibility = "visible";
    element.style.opacity = "1";
    element.style.height = "auto";
  });
});

function startSpin() {
  img.style.animationName = "none";
  img.style.animationName = "spin";
  img.style.animationIterationCount = "1";
  img.style.animationDuration = "0.5s";
}

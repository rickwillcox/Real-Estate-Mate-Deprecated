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
`;
  document.head.appendChild(style);
}

function addRealEstateMateContainer() {
  if (document.getElementsByClassName("real-estate-mate").length > 0) {
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
    <div class="real-estate-mate-listing-updates"  style="visibility: hidden; opacity: 0; transition: opacity 1s ease-in-out; height: 0"> </div>
    </div>`;
}
// how can I get the current url that the user is on
function getUrlFromPage() {
  const url = window.location.href;
  return url;
}

function addPriceRangeToDom() {
  const regex =
    /marketing_price_range\\\\\\\\\\\\\\":\\\\\\\\\\\\\\"(.*?)\\\\\\\\\\\\\\"/;
  const matches = document.documentElement.innerHTML.match(regex);

  if (matches === null) {
    document.getElementsByClassName(
      "real-estate-mate-price-range"
    )[0].innerHTML += `No price range available`;
    return;
  }
  document.getElementsByClassName(
    "real-estate-mate-price-range"
  )[0].innerHTML += `${matches[1].replace("_", " - ")}`;

  let split_price = matches[1].split("_");
  if (split_price.length === 2) {
    backgroundFunctions.updateBackend.args.minPrice = split_price[0];
    backgroundFunctions.updateBackend.args.maxPrice = split_price[1];
  } else {
    backgroundFunctions.updateBackend.args.minPrice = split_price[0];
    backgroundFunctions.updateBackend.args.maxPrice = split_price[0];
  }
}

function addBankEstToDom(data) {
  const estimate = data[0];
  const domainId = data[1];

  let link = `https://www.commbank.com.au/digital/home-buying/property/${domainId}?byAddress=true`;
  if (!domainId) {
    link = "https://www.commbank.com.au/digital/home-buying/search";
  }
  if (getCommbankPriceComplete) return;
  getCommbankPriceComplete = true;
  document.getElementsByClassName(
    "real-estate-mate-bank-est"
  )[0].innerHTML += ` <a  style="color: blue" target="blank" href="${link}"> ${
    estimate === null ? "Not Available" : "$" + estimate
  }</a>`;
}

function addNbnToDom(data) {
  getNbnDataComplete = true;

  if (!data) {
    const internetElement = document.querySelector(
      ".real-estate-mate-internet"
    );
    internetElement.innerHTML = `Internet:  <a  style="color: blue" target="blank" href="https://www.nbnco.com.au/connect-home-or-business/check-your-address">Not Available</a>`;
    return;
  }
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
  }

  let list = document.getElementsByClassName(
    "real-estate-mate-internet-list"
  )[0];

  if (speed) {
    let speedItem = document.createElement("li");
    if (lowerSpeed && upperSpeed) {
      speedItem.innerHTML = `<h6>Speed: <span style="color: ${
        upperSpeed < 25 ? "red" : upperSpeed < 50 ? "orange" : "green"
      };">${lowerSpeed} - ${upperSpeed} mbps</span></h6>`;
    } else {
      speedItem.innerHTML = `<h6>Speed: <span style="color: ${
        speed < 25 ? "red" : speed < 50 ? "orange" : "green"
      };">${speed} mbps</span></h6>`;
    }

    list.appendChild(speedItem);
  }

  if (primaryAccessTechnology) {
    let primaryAccessTechnologyItem = document.createElement("li");
    primaryAccessTechnologyItem.innerHTML += "Connection: ";
    primaryAccessTechnologyItem.innerHTML += `<a  style="color: blue" target="blank" href="${primaryAccessTechnologyLink}">${primaryAccessTechnology}</a>`;
    list.appendChild(primaryAccessTechnologyItem);
  }

  let coExistanceItem = document.createElement("li");
  coExistanceItem.innerHTML += "Co-Existance: ";
  coExistanceItem.innerHTML += `<a  style="color: ${
    coExistance ? "red" : "green"
  }" target="blank" href="https://help.australiabroadband.com.au/support/solutions/articles/44000688641-what-is-co-existence-and-why-does-it-affect-my-internet-speed-">${
    coExistance ? "Yes" : "No"
  }</a>`;
  coExistanceItem.innerHTML += `<span style="color: ${
    coExistance ? "red" : "green"
  }">${coExistance ? "  :(" : "  :)"}</span>`;
  list.appendChild(coExistanceItem);
}

function getPriceInfo() {
  const priceInfo = document.getElementsByClassName(
    "property-price property-info__price"
  )[0].innerHTML;
  return priceInfo;
}

function createGetAddressFunction() {
  let address = null;
  let fullAddress = null;
  return function (getFullAddress) {
    if (getFullAddress && fullAddress) return fullAddress;
    if (address) return address;
    const metaTags = document.getElementsByTagName("meta");
    fullAddress = Array.prototype.reduce.call(
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
    if (getFullAddress) return fullAddress;
    const splitAddress = fullAddress.split(",");
    address = splitAddress[0] + ", " + splitAddress[1];
    return address;
  };
}

const getAddress = createGetAddressFunction();
const backgroundFunctions = {
  onTabUpdated: {
    name: "onTabUpdated",
    args: null,
  },
  getCommbankPrice: {
    name: "getCommbankPrice",
    args: {
      address: getAddress(),
      tabId: null,
    },
  },
  getNbnData: {
    name: "getNbnData",
    args: {
      address: getAddress(),
      tabId: null,
    },
  },
  updateBackend: {
    name: "updateBackend",
    args: {
      address: getAddress(true),
      link: null,
      price: getPriceInfo(),
      minPrice: null,
      maxPrice: null,
      title: "some title",
      tabId: null,
    },
  },
  getListingUpdates: {
    name: "getListingUpdates",
    args: {
      address: getAddress(true),
      tabId: null,
    },
  },
};

chrome.runtime.onMessage.addListener(function (msg) {
  switch (msg.functionName) {
    case "onTabUpdated": {
      tabId = msg.data;
      backgroundFunctions.getCommbankPrice.args.tabId = msg.data;
      backgroundFunctions.getNbnData.args.tabId = msg.data;
      backgroundFunctions.updateBackend.args.tabId = msg.data;
      backgroundFunctions.updateBackend.args.link = window.location.href;
      backgroundFunctions.getListingUpdates.args.tabId = msg.data;
      if (!allFetchingComplete) initRealEstateMate();

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
      console.log("getListingUpdates foreground:", msg.functionName, msg.data);
      addListingUpdatesToDom(msg.data);
      break;
    }
    default:
      break;
  }
  checkAllFetchComplete();
  return;
});

// function addListingUpdatesToDom(listingUpdates) {
//   console.log("addListingUpdatesToDom", listingUpdates);
//   const container = document.getElementsByClassName(
//     "real-estate-mate-listing-updates"
//   )[0];
//   console.log(container);

//   for (const [date, updates] of Object.entries(listingUpdates)) {
//     const group = document.createElement("div");
//     group.classList.add("update-group");

//     const dateHeader = document.createElement("h2");
//     console.log("date", date, "group", group);
//     dateHeader.textContent = date;
//     group.appendChild(dateHeader);

//     updates.forEach((update) => {
//       const updateLine = document.createElement("p");
//       const updatedField = document.createElement("strong");
//       updatedField.textContent = update.updatedField + ": ";
//       updateLine.appendChild(updatedField);
//       updateLine.appendChild(document.createTextNode(update.updatedValue));
//       if (update.lastValue) {
//         updateLine.appendChild(
//           document.createTextNode(` (previously: ${update.lastValue})`)
//         );
//       }
//       console.log(updateLine);
//       group.appendChild(updateLine);
//     });

//     container.appendChild(group);
//     console.log(container);
//   }
// }

document.getElementsByTagName("Style")[0].innerHTML += `

`;

function addListingUpdatesToDom(listingUpdates) {
  const container = document.getElementsByClassName(
    "real-estate-mate-listing-updates"
  )[0];

  // Create the timeline element
  const timeline = document.createElement("div");
  // timeline.classList.add("timeline");
  container.appendChild(timeline);

  // Create a line to indicate the timeline
  const timelineLine = document.createElement("div");
  // timelineLine.classList.add("timeline-line");
  timeline.appendChild(timelineLine);

  let groupSide = "left"; // Keep track of which side the group should be on
  for (const [date, updates] of Object.entries(listingUpdates)) {
    const group = document.createElement("div");
    const dateHeader = document.createElement("div");
    dateHeader.className = "mystyle";
    dateHeader.textContent = date;

    group.appendChild(dateHeader);

    updates.forEach((update) => {
      const updateLine = document.createElement("p");
      updateLine.style.fontSize = "10px";
      const updatedField = document.createElement("strong");
      updatedField.textContent = update.updatedField + ": ";
      updateLine.appendChild(updatedField);
      updateLine.appendChild(document.createTextNode(update.updatedValue));
      if (update.lastValue) {
        updateLine.appendChild(
          document.createTextNode(` (previously: ${update.lastValue})`)
        );
      }
      group.appendChild(updateLine);
    });

    timeline.appendChild(group);
  }
}

let getCommbankPriceComplete = false;
let getNbnDataComplete = false;
let allFetchingComplete = false;

async function initRealEstateMate() {
  addStylesToDom();
  addRealEstateMateContainer();
  addPriceRangeToDom();
  chrome.runtime.sendMessage(backgroundFunctions.getCommbankPrice);
  chrome.runtime.sendMessage(backgroundFunctions.getNbnData);
  chrome.runtime.sendMessage(backgroundFunctions.updateBackend);
  chrome.runtime.sendMessage(backgroundFunctions.getListingUpdates);
}

function checkAllFetchComplete() {
  if (!getCommbankPriceComplete) return;
  if (!getNbnDataComplete) return;
  spinLogo();
  showInformation();
  allFetchingComplete = true;
}

function spinLogo() {
  const img = document.getElementsByClassName("real-estate-mate-logo")[0];
  img.style.animationName = "none";
  img.style.animationName = "spin";
  img.style.animationIterationCount = "1";
  img.style.animationDuration = "0.5s";
}

function showInformation() {
  const priceRangeElement = document.querySelector(
    ".real-estate-mate-price-range"
  );
  const bankEstElement = document.querySelector(".real-estate-mate-bank-est");
  const internetElement = document.querySelector(".real-estate-mate-internet");
  const listingUpdatesElement = document.querySelector(
    ".real-estate-mate-listing-updates"
  );

  const elements = [
    priceRangeElement,
    bankEstElement,
    internetElement,
    listingUpdatesElement,
  ];
  elements.forEach((element) => {
    element.style.visibility = "visible";
    element.style.opacity = "1";
    element.style.height = "auto";
  });
  console.log("BEFORE UPDATE BACKEND");
  console.log("BACKEND", backendFunctions.updateBackend.name);
}

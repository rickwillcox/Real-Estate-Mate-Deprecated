// as a chroms listener
async function getPageSource(url) {
  try {
    const response = await fetch(url);
    const pageSource = await response.text();
    return pageSource;
  } catch (error) {}
  return null;
}

async function getDomainLink(searchTerm) {
  const pageSource = await getPageSource(
    `https://www.domain.com.au/sale/?street=${searchTerm}`
  );
  const regex = /<a href="(https:\/\/www\.domain\.com\.au\/\d+-.*-\d+-\d+)">/;
  const matches = pageSource.match(regex);
  const domainLink = matches !== null ? matches[1].split('"')[0] : null;
  return domainLink;
}

async function getDomainPropertyId(domainLink) {
  const pageSource = await getPageSource(domainLink);
  const regex = /propertyId":"(.+?)"/;
  const matches = pageSource.match(regex);
  const domainPropertyId = matches !== null ? matches[1].split('"')[0] : null;
  return domainPropertyId;
}

async function getCommBankPriceEval(domainPropertyId) {
  const pageSource = await getPageSource(
    `https://www.commbank.com.au/digital/home-buying/property/${domainPropertyId}?byAddress=true`
  );
  const regex = /displayPrice&quot;:\&quot;\$(\d+,\d+)\&/;
  const matches = pageSource.match(regex);
  const commBankPriceEval = matches !== null ? matches[1].split('"')[0] : null;
  return commBankPriceEval;
}

async function commBankHelper(address) {
  let domainLink = null;
  let domainPropertyId = null;
  let commBankPriceEval = null;

  try {
    domainLink = await getDomainLink(address);
    if (domainLink === null) {
      throw new Error("Failed to get domain link");
    }

    domainPropertyId = await getDomainPropertyId(domainLink);
    if (domainPropertyId === null) {
      throw new Error("Failed to get domain property ID");
    }
  } catch (error) {
    return [commBankPriceEval, domainPropertyId];
  }

  commBankPriceEval = await getCommBankPriceEval(domainPropertyId);

  return [commBankPriceEval, domainPropertyId];
}

async function nbnHelper(address) {
  address = address.replace(/,/g, "").replace(/ +/g, " ");
  address = address.replace(/ /g, "+");
  try {
    const nbnData = await fetch(
      `https://nbn-service-check.deta.dev/check?address=${address}`
    );
    const data = await nbnData.json();
    return data.body;
  } catch {
    return null;
  }
}

async function getListingUpdatesHelper(address) {
  // add address to the body of the request
  console.log("44444", address);
  const response = await fetch(
    `http://localhost:3000/getRealEstateListingUpdates`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        address: address.toString(),
      }),
    }
  );
  console.log("!!!!");
  console.log("???", response);
  const data = await response.json();
  return data;
}

chrome.runtime.onMessage.addListener(function async(
  func,
  sender,
  sendResponse
) {
  console.log("background.js", func);
  processForegroundFunction(func);
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status === "complete") {
    const msg = {};
    msg.functionName = "onTabUpdated";
    msg.data = tab.id;
    try {
      chrome.tabs.sendMessage(tab.id, msg);
    } catch {
      throw new Error("Failed to send message to tab");
    }
  }
});

async function processForegroundFunction(func) {
  const msg = {};
  console.log(func);
  switch (func.name) {
    case "getCommbankPrice":
      msg.functionName = func.name;
      msg.data = await commBankHelper(func.args.address);
      chrome.tabs.sendMessage(func.args.tabId, msg);
      break;
    case "getNbnData":
      msg.functionName = func.name;
      msg.data = await nbnHelper(func.args.address);
      chrome.tabs.sendMessage(func.args.tabId, msg);
      break;
    case "updateBackend":
      console.log("UPDATING BACKEND TRIGGERSS");
      console.log("updating backend", func.args);
      await updateRealEstateListing(
        func.args.address,
        func.args.link,
        func.args.price,
        func.args.minPrice,
        func.args.maxPrice,
        func.args.title
      );
    case "getListingUpdates": {
      msg.functionName = func.name;
      msg.data = await getListingUpdatesHelper(func.args.address);
      console.log("listing updates background after fetch", msg.data);
      chrome.tabs.sendMessage(func.args.tabId, msg);

      break;
    }
    default:
      break;
  }
}

//

function createNewComment(comment, address) {
  fetch("http://localhost:3000/createNewComment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      comment: comment,
      realEstateListingAddress: address,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      // do something with the response data
    })
    .catch((error) => {
      // handle any errors
    });
}

function updateRealEstateListing(
  address,
  link,
  price,
  minPrice,
  maxPrice,
  title
) {
  console.log(
    "updating real estate listing",
    address,
    link,
    price,
    minPrice,
    maxPrice,
    title
  );
  fetch("http://localhost:3000/updateRealEstateListing", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      address: address,
      link: link,
      price: price,
      minPrice: minPrice,
      maxPrice: maxPrice,
      title: title,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      // do something with the response data
    })
    .catch((error) => {
      // handle any errors
    });
}

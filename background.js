// as a chroms listener
async function getPageSource(url) {
  try {
    const response = await fetch(url);
    const pageSource = await response.text();
    return pageSource;
  } catch (error) {
    console.error(error);
  }
}

async function getDomainLink(searchTerm) {
  const pageSource = await getPageSource(
    `https://www.domain.com.au/sale/?street=${searchTerm}`
  );
  const regex = /<a href="(https:\/\/www\.domain\.com\.au\/\d+-.*-\d+-\d+)">/;
  const matches = pageSource.match(regex);
  const domainLink = matches !== null ? matches[1].split('"')[0] : null;
  console.log(domainLink);
  return domainLink;
}

async function getDomainPropertyId(domainLink) {
  const pageSource = await getPageSource(domainLink);
  const regex = /propertyId":"(.+?)"/;
  const matches = pageSource.match(regex);
  const domainPropertyId = matches !== null ? matches[1].split('"')[0] : null;
  console.log(domainPropertyId);
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
    console.log("domainLink", domainLink);
    if (domainLink === null) {
      throw new Error("Failed to get domain link");
    }

    domainPropertyId = await getDomainPropertyId(domainLink);
    console.log("domainPropertyId", domainPropertyId);
    if (domainPropertyId === null) {
      throw new Error("Failed to get domain property ID");
    }
  } catch (error) {
    console.error(error);
    return [commBankPriceEval, domainPropertyId];
  }

  commBankPriceEval = await getCommBankPriceEval(domainPropertyId);
  console.log("commBankPriceEval", commBankPriceEval);

  return [commBankPriceEval, domainPropertyId];
}

async function nbnHelper(address) {
  // fetc from this https://nbn-service-check.deta.dev/check?address=
  // https://nbn-service-check.deta.dev/check?address=1%20Bourke%20Street%2C%20Melbourne%2C%20VIC%203000
  // it returns json data
  // replace all spaces with a +, remove any commas and reduce all multiple spaces to a single space
  address = address.replace(/,/g, "").replace(/ +/g, " ");
  // replace all spaces with a +
  address = address.replace(/ /g, "+");
  console.log("nbn helper", address);

  try {
    const nbnData = await fetch(
      `https://nbn-service-check.deta.dev/check?address=${address}`
    );
    const data = await nbnData.json();
    console.log("nbn data", data);
    return data.body;
  } catch {
    return null;
  }
}

chrome.runtime.onMessage.addListener(function async(
  func,
  sender,
  sendResponse
) {
  processForegroundFunction(func);
});

chrome.tabs.onActivated.addListener(function callback(activeInfo) {
  chrome.tabs.get(activeInfo.tabId, function (tab) {
    const msg = {};
    msg.functionName = "onTabActivated";
    msg.data = tab.id;
    console.log("replying to onTabActivated", msg.functionName, tab);
    chrome.tabs.sendMessage(tab.id, msg);
  });
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status === "complete") {
    const msg = {};
    msg.functionName = "onTabUpdated";
    msg.data = tab.id;
    console.log("replying to onTabUpdated", msg.functionName, tab);
    chrome.tabs.sendMessage(tab.id, msg);
  }
});

async function processForegroundFunction(func) {
  console.log(func.name, func.args.tabId);
  const msg = {};
  switch (func.name) {
    case "getCommbankPrice":
      msg.functionName = func.name;
      msg.data = await commBankHelper(func.args.address);
      break;
    case "getNbnData":
      msg.functionName = func.name;
      msg.data = await nbnHelper(func.args.address);
      break;
    default:
      break;
  }
  // sendMessageToActiveTab(msg, tabId);
  console.log("before send message", msg, func.args.tabId);
  chrome.tabs.sendMessage(func.args.tabId, msg);
}

//

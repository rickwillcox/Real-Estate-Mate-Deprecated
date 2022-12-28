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

chrome.runtime.onMessage.addListener(function async(
  func,
  sender,
  sendResponse
) {
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
  chrome.tabs.sendMessage(func.args.tabId, msg);
}

//

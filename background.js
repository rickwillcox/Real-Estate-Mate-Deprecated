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
  const domainLink = matches[1].split('"')[0];
  console.log(domainLink);
  return domainLink;
}

async function getDomainPropertyId(domainLink) {
  const pageSource = await getPageSource(domainLink);
  const regex = /propertyId":"(.+?)"/;
  const matches = pageSource.match(regex);
  const domainPropertyId = matches[1].split('"')[0];
  console.log(domainPropertyId);
  return domainPropertyId;
}

async function getCommBankPriceEval(domainPropertyId) {
  const pageSource = await getPageSource(
    `https://www.commbank.com.au/digital/home-buying/property/${domainPropertyId}?byAddress=true`
  );
  const regex = /displayPrice&quot;:\&quot;\$(\d+,\d+)\&/;
  const matches = pageSource.match(regex);
  const commBankPriceEval = matches[1].split('"')[0];
  console.log(commBankPriceEval);
  return commBankPriceEval;
}

async function commBankHelper(address) {
  try {
    const domainLink = await getDomainLink(address);
    const domainPropertyId = await getDomainPropertyId(domainLink);
    const commBankPriceEval = await getCommBankPriceEval(domainPropertyId);
    return [commBankPriceEval, domainPropertyId];
  } catch {
    return [null, null];
  }
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

  const nbnData = await fetch(
    `https://nbn-service-check.deta.dev/check?address=${address}`
  );
  const data = await nbnData.json();
  console.log("nbn data", data);
  return data.body;
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

// I also need to do the same as above if they just click into it via a link
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
  const msg = {};
  console.log("!!!!", func);
  switch (func.name) {
    case "getTabId":
      msg.functionName = func.name;
      msg.data = await chrome.tabs.query({}, function (tabs) {
        console.log("replying to getTabId", msg.functionName, tabs);
        return tabs[0].id;
      });
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
  console.log("ebfore send message", msg, tabId);
  chrome.tabs.sendMessage(func.args.tabId, msg);
}

async function sendMessageToActiveTab(msg) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    console.log("replying to forground", msg.functionName, tabs);

    chrome.tabs.sendMessage(tabs[0].id, msg);
  });
}

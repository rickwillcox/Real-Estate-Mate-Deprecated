document.getElementsByClassName("property-price property-info__price")[0].innerHTML += ` <br />Price Range: ${document.documentElement.innerHTML.match(/\d+(\.\d+)?(m|k)_\d+(\.\d+)?(m|k)/)[0].replace("_", " - ")} 🤫`

function getOgTitle() {
    var metaTags = document.getElementsByTagName('meta');
    var title = Array.prototype.reduce.call(metaTags, function(acc, metaTag) {
        if (metaTag.getAttribute('property') == 'og:title') {
            return metaTag.getAttribute('content');
        } else {
            return acc;
        }
    }, null);
    return title;
}
const title = getOgTitle();
console.log("!!!!!!!, title: ", title);
const addressArr = title.split(",");
const address = addressArr[0] + ", " + addressArr[1];

console.log("!!!!!!!, address: ", address);

async function getPageSource(url) {
    try {
        const response = await fetch(url);
        const pageSource = await response.text();
        return pageSource;
    } catch (error) {
        console.error(error);
    }
}


async function getDomainLink(searchTerm){
    const pageSource = await getPageSource(`https://www.domain.com.au/sale/?street=${searchTerm}`);
    const regex = /<a href="(https:\/\/www\.domain\.com\.au\/\d+-.*-\d+-\d+)">/;
    const matches = pageSource.match(regex);
    const domainLink = matches[1].split('"')[0];
    console.log(domainLink);
    return domainLink;
}

async function getDomainPropertyId(domainLink){
    const pageSource = await getPageSource(domainLink);
    const regex = /propertyId":"(.+?)"/;
    const matches = pageSource.match(regex);
    const domainPropertyId =  matches[1].split('"')[0];
    console.log(domainPropertyId);
    return domainPropertyId;
}

async function getCommBankPriceEval(domainPropertyId){
    const pageSource = await getPageSource(`https://www.commbank.com.au/digital/home-buying/property/${domainPropertyId}?byAddress=true`);
    const regex = /displayPrice&quot;:\&quot;\$(\d+,\d+)\&/;
    const matches = pageSource.match(regex);
    const commBankPriceEval =  matches[1].split('"')[0];
    console.log(commBankPriceEval);
    return commBankPriceEval;
}


async function main(){
    const domainLink = await getDomainLink(address);
    const domainPropertyId = await getDomainPropertyId(domainLink);
    const commBankPriceEval = await getCommBankPriceEval(domainPropertyId);
    document.getElementsByClassName("property-price property-info__price")[0].innerHTML += ` <br /><a href="https://www.commbank.com.au/digital/home-buying/property/${domainPropertyId}?byAddress=true">Bank Estimate: $${commBankPriceEval}</a>`


}

main();

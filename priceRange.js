
document.getElementsByClassName("property-price property-info__price")[0].innerHTML += ` <br />Price Range: ${document.documentElement.innerHTML.match(/\d+k_\d+k/)[0].replace("_", " - ")} 🤫`

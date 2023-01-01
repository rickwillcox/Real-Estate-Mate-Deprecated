function getInternetPrimaryAccessTechnologyElement() {
  let primaryAccessTechnology: HTMLAnchorElement;
  return function () {
    if (!primaryAccessTechnology) {
      primaryAccessTechnology = document.getElementsByClassName(
        "rem-internet-list-connection"
      )[0] as HTMLAnchorElement;
    }
    return primaryAccessTechnology;
  };
}

function getInternetCoExistanceElement() {
  let internetCoExistanceElement: HTMLAnchorElement;
  return function () {
    if (!internetCoExistanceElement) {
      internetCoExistanceElement = document.getElementsByClassName(
        "rem-internet-list-co-existance"
      )[0] as HTMLAnchorElement;
    }
    return internetCoExistanceElement;
  };
}

function getInternetCoExistanceFaceElement() {
  let internetCoExistanceFaceElement: HTMLElement;
  return function () {
    if (!internetCoExistanceFaceElement) {
      internetCoExistanceFaceElement = document.getElementsByClassName(
        "rem-internet-list-co-existance-face"
      )[0] as HTMLElement;
    }
    return internetCoExistanceFaceElement;
  };
}

function getInternetSpeedElement() {
  let internetSpeedElement: HTMLElement;
  return function () {
    if (!internetSpeedElement) {
      internetSpeedElement = document.getElementsByClassName(
        "rem-internet-list-speed"
      )[0] as HTMLElement;
    }
    return internetSpeedElement;
  };
}

function getInternetElementInner() {
  let internetElementInner: HTMLAnchorElement;
  return function () {
    if (!internetElementInner) {
      internetElementInner = document.getElementsByClassName(
        "rem-internet-est-inner"
      )[0] as HTMLAnchorElement;
    }
    return internetElementInner;
  };
}

function getInternetElement() {
  let internetElement: HTMLElement;
  return function () {
    if (!internetElement) {
      internetElement = document.querySelector(".rem-internet") as HTMLElement;
    }
    return internetElement;
  };
}

function getInternetListElement() {
  let internetListElement: HTMLUListElement;
  return function () {
    if (!internetListElement) {
      internetListElement = document.getElementsByClassName(
        "rem-internet-list"
      )[0] as HTMLUListElement;
    }
    return internetListElement;
  };
}

function getBankEstElementInner() {
  let bankEstElementInner: HTMLAnchorElement;
  return function () {
    if (!bankEstElementInner) {
      bankEstElementInner = document.getElementsByClassName(
        "rem-bank-est-inner"
      )[0] as HTMLAnchorElement;
    }
    return bankEstElementInner;
  };
}

function getBankEstElement() {
  let bankEstElement: HTMLElement;
  return function () {
    if (!bankEstElement) {
      bankEstElement = document.querySelector(".rem-bank-est") as HTMLElement;
    }
    return bankEstElement;
  };
}

function getPriceRangeInnerElement() {
  let priceRangeInnerElement: HTMLElement;
  return function () {
    if (!priceRangeInnerElement) {
      priceRangeInnerElement = document.getElementsByClassName(
        "rem-price-range-inner"
      )[0] as HTMLElement;
    }
    return priceRangeInnerElement;
  };
}

function getPriceRangeElement() {
  let priceRangeElement: HTMLElement;
  return function () {
    if (!priceRangeElement) {
      priceRangeElement = document.querySelector(
        ".rem-price-range"
      ) as HTMLElement;
    }
    return priceRangeElement;
  };
}

function getRealEstateMateElement() {
  let realEstateMateElement: HTMLElement;
  return function () {
    if (!realEstateMateElement) {
      realEstateMateElement = document.getElementsByClassName(
        "real-estate-mate"
      )[0] as HTMLElement;
    }
    return realEstateMateElement;
  };
}

function getPropertyInfoMiddleContentElement() {
  let propertyInfoMiddleContentElement: HTMLElement;
  return function () {
    if (!propertyInfoMiddleContentElement) {
      propertyInfoMiddleContentElement = document.getElementsByClassName(
        "property-info__middle-content"
      )[0] as HTMLElement;
    }
    return propertyInfoMiddleContentElement;
  };
}

function getListingUpdatesElement() {
  let listingUpdatesElement: HTMLElement;
  return function () {
    if (!listingUpdatesElement) {
      listingUpdatesElement = document.querySelector(
        ".rem-listing-updates"
      ) as HTMLElement;
    }
    return listingUpdatesElement;
  };
}

function getLogoElement() {
  let logoElement: HTMLImageElement;
  return function () {
    if (!logoElement) {
      logoElement = document.getElementsByClassName(
        "rem-logo"
      )[0] as HTMLImageElement;
    }
    return logoElement;
  };
}

function getPriceInfoElement() {
  let priceInfoElement: HTMLElement;
  return function () {
    if (!priceInfoElement) {
      priceInfoElement = document.getElementsByClassName(
        "property-price property-info__price"
      )[0] as HTMLElement;
    }
    return priceInfoElement;
  };
}

export const internetPrimaryAccessTechnologyElement =
  getInternetPrimaryAccessTechnologyElement();

export const internetCoExistanceElement = getInternetCoExistanceElement();

export const internetCoExistanceFaceElement =
  getInternetCoExistanceFaceElement();

export const internetSpeedElement = getInternetSpeedElement();

export const internetElementInner = getInternetElementInner();

export const internetElement = getInternetElement();

export const internetListElement = getInternetListElement();

export const bankEstElementInner = getBankEstElementInner();

export const bankEstElement = getBankEstElement();

export const priceRangeInnerElement = getPriceRangeInnerElement();

export const priceRangeElement = getPriceRangeElement();

export const realEstateMateElement = getRealEstateMateElement();

export const propertyInfoMiddleContentElement =
  getPropertyInfoMiddleContentElement();

export const listingUpdatesElement = getListingUpdatesElement();

export const logoElement = getLogoElement();

export const priceInfoElement = getPriceInfoElement();

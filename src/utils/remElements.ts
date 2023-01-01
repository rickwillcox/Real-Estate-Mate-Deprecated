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

export const internetPrimaryAccessTechnologyElement =
  getInternetPrimaryAccessTechnologyElement();

export const internetCoExistanceElement = getInternetCoExistanceElement();

export const internetCoExistanceFaceElement =
  getInternetCoExistanceFaceElement();

export const internetSpeedElement = getInternetSpeedElement();

export const internetElementInner = getInternetElementInner();

export const internetElement = getInternetElement();

export const internetListElement = getInternetListElement();

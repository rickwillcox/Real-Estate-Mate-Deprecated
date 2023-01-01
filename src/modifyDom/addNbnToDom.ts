import { foregroundStore } from "../stores";
import { fgLog } from "../utils";
import { fadeInElement } from ".";

export function addNbnToDom(data: {
  primaryAccessTechnology: any;
  speed: any;
  lowerSpeed: any;
  upperSpeed: any;
  networkCoexistence: string;
}) {
  fgLog("addNbnToDom start", data);
  const { getState, setState, subscribe, destroy } = foregroundStore;

  setState({ nbnDataComplete: true });
  const internetElement = document.querySelector(
    ".real-estate-mate-internet"
  ) as HTMLElement;
  fadeInElement(internetElement);
  if (!data) {
    const internetElementInner = document.getElementsByClassName(
      "real-estate-mate-internet-est-inner"
    )[0] as HTMLAnchorElement;
    if (!internetElementInner) {
      fgLog("addNbnToDom early return (!internetElement) end");
      return;
    }
    internetElementInner.style.visibility = "visible";
    fgLog("addNbnToDom early return (!data) end");
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
    let speedElement = document.getElementsByClassName(
      "real-estate-mate-internet-list-speed"
    )[0] as HTMLElement;
    let speedDisplay = lowerSpeed && upperSpeed ? upperSpeed : speed;
    speedElement.innerHTML =
      lowerSpeed && upperSpeed
        ? `${lowerSpeed} - ${upperSpeed} mbps`
        : `${speedDisplay} mbps`;
    speedElement.style.color =
      speedDisplay < 25 ? "red" : speedDisplay < 50 ? "orange" : "green";
  }

  if (primaryAccessTechnology) {
    let primaryAccessTechnologyElement = document.getElementsByClassName(
      "real-estate-mate-internet-list-connection"
    )[0] as HTMLAnchorElement;
    primaryAccessTechnologyElement.innerHTML = primaryAccessTechnology;
    primaryAccessTechnologyElement.href = primaryAccessTechnologyLink;
  }

  let coExistanceElement = document.getElementsByClassName(
    "real-estate-mate-internet-list-co-existance"
  )[0] as HTMLAnchorElement;
  console.log("coExistanceElement", coExistanceElement);
  coExistanceElement.innerHTML = coExistance ? "Yes" : "No";
  coExistanceElement.style.color = coExistance ? "red" : "green";

  let coExistanceFaceElement = document.getElementsByClassName(
    "real-estate-mate-internet-list-co-existance-face"
  )[0] as HTMLElement;

  coExistanceFaceElement.innerHTML = coExistance ? "  :(" : "  :)";
  coExistanceFaceElement.style.color = coExistance ? "red" : "green";

  fgLog("addNbnToDom end");
}

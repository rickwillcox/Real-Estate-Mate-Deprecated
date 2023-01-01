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
  // if (getState().nbnDataComplete) {
  //   fgLog("addNbnToDom early return (getState().nbnDataComplete) end");
  //   return;
  // }
  setState({ nbnDataComplete: true });
  const internetElement = document.querySelector(
    ".real-estate-mate-internet"
  ) as HTMLElement;
  fadeInElement(internetElement);
  if (!data) {
    const internetElement = document.querySelector(
      ".real-estate-mate-internet"
    );
    if (!internetElement) {
      fgLog("addNbnToDom early return (!internetElement) end");
      return;
    }
    internetElement.innerHTML = `Internet:  <a  style="color: blue" target="blank" href="https://www.nbnco.com.au/connect-home-or-business/check-your-address">Not Available</a>`;
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
  fgLog("addNbnToDom end");
}

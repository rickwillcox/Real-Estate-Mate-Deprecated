import { foregroundStore } from "../stores";
import {
  fgLog,
  internetCoExistanceElement,
  internetCoExistanceFaceElement,
  internetElement,
  internetElementInner,
  internetListElement,
  internetPrimaryAccessTechnologyElement,
  internetSpeedElement,
} from "../utils";
import { fadeInElement } from ".";

export function addNbnToDom(data: {
  primaryAccessTechnology: any;
  speed: any;
  lowerSpeed: any;
  upperSpeed: any;
  networkCoexistence: string;
}) {
  fgLog("addNbnToDom start", data);
  const { setState } = foregroundStore;
  setState({ nbnDataComplete: true });
  fadeInElement(internetElement());
  if (!data) {
    if (!internetElementInner()) {
      fgLog("addNbnToDom early return (!internetElement) end");
      return;
    }
    internetElementInner().style.visibility = "visible";
    internetListElement().style.visibility = "hidden";
    internetListElement().style.height = "0px";
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

  if (speed) {
    let speedDisplay = lowerSpeed && upperSpeed ? upperSpeed : speed;
    internetSpeedElement().innerHTML =
      lowerSpeed && upperSpeed
        ? `${lowerSpeed} - ${upperSpeed} mbps`
        : `${speedDisplay} mbps`;
    internetSpeedElement().style.color =
      speedDisplay < 25 ? "red" : speedDisplay < 50 ? "orange" : "#32CD32";
  }
  if (primaryAccessTechnology) {
    internetPrimaryAccessTechnologyElement().innerHTML =
      primaryAccessTechnology;
    internetPrimaryAccessTechnologyElement().href = primaryAccessTechnologyLink;
  }

  internetCoExistanceElement().innerHTML = coExistance ? "Yes" : "No";
  internetCoExistanceElement().style.color = coExistance ? "red" : "#32CD32";

  internetCoExistanceFaceElement().innerHTML = coExistance ? "  :(" : "  :)";
  internetCoExistanceFaceElement().style.color = coExistance
    ? "red"
    : "#32CD32";

  fgLog("addNbnToDom end");
}

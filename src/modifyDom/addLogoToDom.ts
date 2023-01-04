import { mainContainerInitalSetup } from "../containers";
import { logoElement } from "../utils";

export function addLogoToDom() {
  logoElement().src = mainContainerInitalSetup.logoData.src;
  logoElement().alt = mainContainerInitalSetup.logoData.alt;
  logoElement().height = mainContainerInitalSetup.logoData.height;
  logoElement().width = mainContainerInitalSetup.logoData.width;
}

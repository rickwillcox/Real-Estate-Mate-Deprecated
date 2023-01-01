import { mainContainer } from "../containers";
import {
  fgLog,
  realEstateMateElement,
  propertyInfoMiddleContentElement,
} from "../utils";

export async function addRealEstateMateContainer() {
  fgLog("addRealEstateMateContainer start");
  if (realEstateMateElement()) {
    fgLog("addRealEstateMateContainer removing old container");
    realEstateMateElement().remove();
  }

  propertyInfoMiddleContentElement().innerHTML += mainContainer;
  fgLog("addRealEstateMateContainer end");
}

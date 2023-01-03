import { mainContainer } from "../containers";
import {
  realEstateMateElement,
  propertyInfoMiddleContentElement,
} from "../utils";

export async function addRealEstateMateContainer() {
  if (realEstateMateElement()) {
    realEstateMateElement().remove();
  }
  propertyInfoMiddleContentElement().innerHTML += mainContainer;
}

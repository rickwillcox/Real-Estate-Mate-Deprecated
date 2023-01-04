import {
  addBankEstToDom,
  addLoadingDotsToDom,
  addLogoToDom,
  addPriceRangeToDom,
} from ".";
import { internetListContainer, mainContainerInitalSetup } from "../containers";
import { backgroundFunctionsStore } from "../stores/backgroundFunctionsStore";
import {
  realEstateMateElement,
  propertyInfoMiddleContentElement,
  mainContainerTitleElement,
  logoElement,
  internetElement,
} from "../utils";

const { getState: bgfGetState, setState: bgfSetState } =
  backgroundFunctionsStore;

export async function addRealEstateMateContainer(html: string) {
  if (realEstateMateElement()) {
    realEstateMateElement().remove();
  }
  // add container
  propertyInfoMiddleContentElement().innerHTML += html;

  addLogoToDom();

  addPriceRangeToDom(bgfGetState().backgroundFunctions);

  addLoadingDotsToDom();

  internetElement().innerHTML += internetListContainer;

  // add internet

  // add listing updates
}

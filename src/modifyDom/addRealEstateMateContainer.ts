import { mainContainer } from "../containers";
import { fgLog } from "../utils";

export async function addRealEstateMateContainer() {
  fgLog("addRealEstateMateContainer start");
  if (document.getElementsByClassName("real-estate-mate").length > 0) {
    fgLog("addRealEstateMateContainer removing old container");
    document.getElementsByClassName("real-estate-mate")[0].remove();
  }

  document.getElementsByClassName(
    "property-info__middle-content"
  )[0].innerHTML += mainContainer;
  fgLog("addRealEstateMateContainer end");
}

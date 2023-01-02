import { UpdateEvent } from "../interfaces";
import { bgLog, fgLog, listingUpdatesElement } from "../utils";
import { fadeInElement } from "./fadeInElement";

export function addListingUpdatesToDom(listingUpdates: {
  [key: string]: UpdateEvent[];
}) {
  bgLog(listingUpdates, "hl");
  console.log(listingUpdates);
  let listingUpdatesHtml = "";
  for (const [date, events] of Object.entries(listingUpdates)) {
    listingUpdatesHtml += `<li class="rem-event" data-date="${
      date.split(" ")[0]
    }">`;
    for (const event of events) {
      listingUpdatesHtml += `<p data-label="${event.updatedField}:"> </br>${event.updatedValue}</p>`;
    }
    listingUpdatesHtml += `</li>`;
  }

  // add the below show all and toggleShowAll to a script tag on the document
  let showAll = false;
  function toggleShowAll() {
    const showAllButton = document.getElementsByClassName("show-all-button")[0];
    showAll = !showAll;
    showAllButton.innerHTML = showAll ? "▲" : "▼";
    const timeline = document.getElementsByClassName("rem-timeline")[0];
    timeline.classList.toggle("expand");
  }

  const totalUpdates = Object.keys(listingUpdates).length;
  listingUpdatesElement().innerHTML = `
  <h1>Listing Timeline: ${
    totalUpdates
      ? `(${totalUpdates}) 
      <button class="show-all-button">▼</button>
      `
      : `<span class="rem-no-updates">No Updates</span>`
  }</h1>
  <ul class="rem-timeline">
    ${listingUpdatesHtml}
  </ul>
    `;
  bgLog("after");

  const showAllButton = document.getElementsByClassName("show-all-button")[0];
  if (showAllButton) {
    showAllButton.addEventListener("click", toggleShowAll);
  }

  fadeInElement(listingUpdatesElement());
}

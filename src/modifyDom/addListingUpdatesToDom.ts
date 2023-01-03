import { UpdateEvent } from "../interfaces";
import { listingUpdatesElement, listingUpdatesLoadingElement } from "../utils";
import { fadeInElement } from "./fadeInElement";
import $ from "jquery";

export function addListingUpdatesToDom(listingUpdates: {
  [key: string]: UpdateEvent[];
}) {
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

  let showAll = false;
  function toggleShowAll() {
    console.log("toggleShowAll");
    const showAllButton = document.getElementsByClassName("show-all-button")[0];
    showAll = !showAll;
    showAllButton.innerHTML = showAll ? "▲" : "▼";
    const timeline = document.getElementsByClassName(
      "rem-timeline"
    )[0] as HTMLElement;
    $(timeline).slideToggle("fast");
    fadeInElement(timeline);
  }

  const totalUpdates = Object.keys(listingUpdates).length;
  listingUpdatesElement().innerHTML += `
  <span>${
    totalUpdates
      ? `(${totalUpdates}) 
      <button class="show-all-button">▼</button>
      `
      : `<span class="rem-no-updates">No Updates</span>`
  }</span>
  <ul class="rem-timeline">
    ${listingUpdatesHtml}
  </ul>
    `;

  const showAllButton = document.getElementsByClassName("show-all-button")[0];
  if (showAllButton) {
    showAllButton.addEventListener("click", toggleShowAll);
  }
  listingUpdatesLoadingElement().remove();
  fadeInElement(listingUpdatesElement());
}

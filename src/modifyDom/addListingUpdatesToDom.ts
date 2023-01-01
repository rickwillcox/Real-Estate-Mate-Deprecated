import { UpdateEvent } from "../interfaces";

export function addListingUpdatesToDom(listingUpdates: {
  [key: string]: UpdateEvent[];
}) {
  // const container = document.getElementsByClassName(
  //   "real-estate-mate-listing-updates"
  // )[0];
  // // Create the timeline element
  // const timeline = document.createElement("div");
  // // timeline.classList.add("timeline");
  // container.appendChild(timeline);
  // // Create a line to indicate the timeline
  // const timelineLine = document.createElement("div");
  // // timelineLine.classList.add("timeline-line");
  // timeline.appendChild(timelineLine);
  // let groupSide = "left"; // Keep track of which side the group should be on
  // for (const [date, updates] of Object.entries(listingUpdates)) {
  //   const group = document.createElement("div");
  //   const dateHeader = document.createElement("div");
  //   dateHeader.className = "mystyle";
  //   dateHeader.textContent = date;
  //   group.appendChild(dateHeader);
  //   updates.forEach(
  //     (update: {
  //       updatedField: string;
  //       updatedValue: string;
  //       lastValue: any;
  //     }) => {
  //       const updateLine = document.createElement("p");
  //       updateLine.style.fontSize = "10px";
  //       const updatedField = document.createElement("strong");
  //       updatedField.textContent = update.updatedField + ": ";
  //       updateLine.appendChild(updatedField);
  //       updateLine.appendChild(document.createTextNode(update.updatedValue));
  //       if (update.lastValue) {
  //         updateLine.appendChild(
  //           document.createTextNode(` (previously: ${update.lastValue})`)
  //         );
  //       }
  //       group.appendChild(updateLine);
  //     }
  //   );
  //   timeline.appendChild(group);
  // }
}

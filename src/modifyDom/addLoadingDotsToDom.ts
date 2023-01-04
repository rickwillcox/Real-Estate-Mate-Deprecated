import {
  bankEstElementInner,
  internetElement,
  listingUpdatesElement,
} from "../utils";

const loadingAnimation = `
  <span class="rem-loading">
    <span class="rem-dot"></span>
    <span class="rem-dot"></span>
    <span class="rem-dot"></span>
  </span>
`;

function genLoadingSpan(className: string) {
  return `<span class="${className}">${loadingAnimation}</span>`;
}

export function addLoadingDotsToDom() {
  bankEstElementInner().innerHTML += genLoadingSpan("rem-bank-loading");
  internetElement().innerHTML += genLoadingSpan("rem-internet-loading");
  listingUpdatesElement().innerHTML += genLoadingSpan(
    "rem-listing-updates-loading"
  );
}

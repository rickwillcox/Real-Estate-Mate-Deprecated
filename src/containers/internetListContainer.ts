const defaultConnectionLink =
  "https://www.nbnco.com.au/learn/network-technology";
const coExistanceLink =
  "https://help.australiabroadband.com.au/support/solutions/articles/44000688641-what-is-co-existence-and-why-does-it-affect-my-internet-speed-";

const internetListContainer = `
  <ul class="rem-internet-list">
    <li><h6>Speed: <span class="rem-internet-list-speed"></span></h6></li>
    <li><h6>Connection: <a class="rem-internet-list-connection" target="blank" href="${defaultConnectionLink}">Not Available</a></h6></li>
    <li><h6>Co-Existance: <a class="rem-internet-list-co-existance" target="blank" href="${coExistanceLink}"></a><span class="rem-internet-list-co-existance-face"></span></h6></li>
  </ul>
`;

export { internetListContainer };

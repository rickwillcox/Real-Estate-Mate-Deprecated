export interface FgToBgFunctions {
  onTabUpdated: {
    name: string;
    args: {
      tabId: number;
    };
  };
  getCommbankPrice: {
    name: string;
    args: {
      address: string | null;
      tabId: number;
    };
  };
  getNbnData: {
    name: string;
    args: {
      address: string | null;
      tabId: number;
    };
  };
  updateBackend: {
    name: string;
    args: {
      address: string | null;
      link: string;
      price: string;
      minPrice: string;
      maxPrice: string;
      title: string;
      tabId: number;
    };
  };
  getListingUpdates: {
    name: string;
    args: {
      address: string | null;
      tabId: number;
    };
  };
  getTestComponent: {
    name: "getTestComponent";
    args: {
      tabId: number;
    };
  };
}

export interface FgToBgFunctions {
  onTabUpdated: {
    name: string;
    args: string;
  };
  getCommbankPrice: {
    name: string;
    args: {
      address: string | null;
      tabId: string;
    };
  };
  getNbnData: {
    name: string;
    args: {
      address: string | null;
      tabId: string;
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
      tabId: string;
    };
  };
  getListingUpdates: {
    name: string;
    args: {
      address: string | null;
      tabId: string;
    };
  };
}

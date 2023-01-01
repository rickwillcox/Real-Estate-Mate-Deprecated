import create from "zustand/vanilla";
import { createGetAddressFunction, getPriceInfo } from "../utils";
import { FgToBgFunctions } from "../interfaces";

const getAddress = createGetAddressFunction();

interface BackgroundFunctionsStore {
  backgroundFunctions: FgToBgFunctions;
  setTabId: (tabId: number) => void;
}

const backgroundFunctionsStore = create<BackgroundFunctionsStore>((set) => ({
  backgroundFunctions: {
    onTabUpdated: {
      name: "onTabUpdated",
      args: {
        tabId: 0,
      },
    },
    getCommbankPrice: {
      name: "getCommbankPrice",
      args: {
        address: getAddress(false),
        tabId: 0,
      },
    },
    getNbnData: {
      name: "getNbnData",
      args: {
        address: getAddress(false),
        tabId: 0,
      },
    },
    updateBackend: {
      name: "updateBackend",
      args: {
        address: getAddress(true),
        link: "",
        price: getPriceInfo(),
        minPrice: "",
        maxPrice: "null",
        title: "some title",
        tabId: 0,
      },
    },
    getListingUpdates: {
      name: "getListingUpdates",
      args: {
        address: getAddress(true),
        tabId: 0,
      },
    },
  },
  setTabId: (tabId: number) =>
    set((state) => {
      const updatedBackgroundFunctions = state.backgroundFunctions;
      Object.keys(updatedBackgroundFunctions).forEach((key) => {
        //@ts-ignore
        updatedBackgroundFunctions[key].args.tabId = tabId;
      });
      return { backgroundFunctions: updatedBackgroundFunctions };
    }),
}));

export { backgroundFunctionsStore };

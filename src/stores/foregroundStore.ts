import create from "zustand/vanilla";

interface ForegroundStoreState {
  commbankPriceComplete: boolean;
  nbnDataComplete: boolean;
  allFetchingComplete: boolean;
}

const foregroundStore = create<ForegroundStoreState>((set) => ({
  commbankPriceComplete: false,
  nbnDataComplete: false,
  allFetchingComplete: false,
}));

export { foregroundStore };

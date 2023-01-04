import create from "zustand/vanilla";

interface BankEstimateStoreState {
  innerHTMLText: string;
}

const foregroundStore = create<BankEstimateStoreState>((set) => ({
  innerHTMLText: "",
}));

export { foregroundStore };

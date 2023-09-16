import { atom } from "recoil";
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";

export interface Coin {
  readonly denom: string;
  readonly amount: string;
}

export const walletState = atom<{
  Cosmos: string | undefined;
  Stride: string | undefined;
  Neutron: string | undefined;
  isLoggedIn: boolean;
}>({
  key: "walletState",
  default: {
    Cosmos: undefined,
    Stride: undefined,
    Neutron: undefined,
    isLoggedIn: false,
  },

  dangerouslyAllowMutability: true,
});

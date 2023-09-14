// import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { atom } from "recoil";
import { ILpCardProps } from "../components/Governance/LpCard";

export const proposalsState = atom<{
  sortedLpList: ILpCardProps[];
  sortedOpList: ILpCardProps[];
  userVotingPower: any[];
}>({
  key: "walletState",
  default: {
    sortedLpList: [],
    sortedOpList: [],
    userVotingPower: [],
  },
  dangerouslyAllowMutability: true,
});

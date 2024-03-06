import { atom } from "recoil";

export const networkState = atom<{
  network: string;
}>({
  key: "networkState",
  // default: {
  //   network: (localStorage.getItem("networkState") !== null)? localStorage.getItem("networkState") as string: "ArchwayMainnet",
  // },
  default: {
    network: "Neutron Mainnet",
  },
  dangerouslyAllowMutability: true,
});

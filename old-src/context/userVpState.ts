import { atom } from "recoil";

export const userVpState = atom<{
  Cosmos: any;
  Stride: any;
  Neutron: any;
}>({
  key: "userVpState",
  default: {
    Cosmos: undefined,
    Stride: undefined,
    Neutron: undefined,
  },
});
